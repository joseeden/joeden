param(
    [string]$Source = "C:\Git\dotfiles",
    [string]$Destination = "C:\Git\joeden\prompts"
)

$ErrorActionPreference = "Stop"

$sourcePath = (Resolve-Path -LiteralPath $Source).Path

if (-not (Test-Path -LiteralPath $Destination)) {
    New-Item -ItemType Directory -Force -Path $Destination | Out-Null
}

$destinationPath = (Resolve-Path -LiteralPath $Destination).Path

$excludedDirectories = @(".git")

function Get-RelativePath {
    param(
        [string]$BasePath,
        [string]$FullPath
    )

    return $FullPath.Substring($BasePath.Length).TrimStart("\", "/")
}

function Get-SyncFiles {
    param([string]$BasePath)

    Get-ChildItem -LiteralPath $BasePath -Recurse -File |
        Where-Object {
            $relative = Get-RelativePath -BasePath $BasePath -FullPath $_.FullName
            $topLevel = ($relative -split "[\\/]")[0]
            $topLevel -notin $excludedDirectories
        } |
        ForEach-Object {
            $relative = Get-RelativePath -BasePath $BasePath -FullPath $_.FullName
            [PSCustomObject]@{
                RelativePath = $relative
                FullName = $_.FullName
                Hash = (Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash
            }
        }
}

$sourceFiles = Get-SyncFiles -BasePath $sourcePath
$destinationFiles = Get-SyncFiles -BasePath $destinationPath

$sourceMap = @{}
$destinationMap = @{}

foreach ($file in $sourceFiles) {
    $sourceMap[$file.RelativePath] = $file
}

foreach ($file in $destinationFiles) {
    $destinationMap[$file.RelativePath] = $file
}

$filesToCopy = @()
$filesToDelete = @()

foreach ($relativePath in $sourceMap.Keys) {
    if (-not $destinationMap.ContainsKey($relativePath)) {
        $filesToCopy += $sourceMap[$relativePath]
        continue
    }

    if ($sourceMap[$relativePath].Hash -ne $destinationMap[$relativePath].Hash) {
        $filesToCopy += $sourceMap[$relativePath]
    }
}

foreach ($relativePath in $destinationMap.Keys) {
    if (-not $sourceMap.ContainsKey($relativePath)) {
        $filesToDelete += $destinationMap[$relativePath]
    }
}

if ($filesToCopy.Count -eq 0 -and $filesToDelete.Count -eq 0) {
    Write-Host "No sync needed. $destinationPath already matches $sourcePath"
    exit 0
}

foreach ($file in $filesToDelete) {
    Remove-Item -LiteralPath $file.FullName -Force
}

foreach ($file in $filesToCopy) {
    $target = Join-Path $destinationPath $file.RelativePath
    $targetDirectory = Split-Path -Parent $target

    if (-not (Test-Path -LiteralPath $targetDirectory)) {
        New-Item -ItemType Directory -Force -Path $targetDirectory | Out-Null
    }

    Copy-Item -LiteralPath $file.FullName -Destination $target -Force
}

Get-ChildItem -LiteralPath $destinationPath -Recurse -Directory |
    Sort-Object FullName -Descending |
    Where-Object {
        $relative = Get-RelativePath -BasePath $destinationPath -FullPath $_.FullName
        $topLevel = ($relative -split "[\\/]")[0]
        $topLevel -notin $excludedDirectories
    } |
    Where-Object { -not (Get-ChildItem -LiteralPath $_.FullName -Force) } |
    Remove-Item -Force

Write-Host "Synced $($filesToCopy.Count) changed file(s) and removed $($filesToDelete.Count) stale file(s)."
