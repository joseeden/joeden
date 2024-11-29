param (
    [string]$Url = (Read-Host -Prompt 'Enter URL')
)

Set-StrictMode -Version Latest

#### yt-dlp.exe shuold be in same folder as .bat and .psi
$ScriptDirectory = Split-Path -Parent $MyInvocation.MyCommand.Definition
$YtDlpPath = Join-Path $ScriptDirectory "yt-dlp.exe"

if (-not (Test-Path $YtDlpPath)) {
    Write-Host "yt-dlp.exe not found in the same directory as the script. Make sure it is present."
    exit 1
}

$DownloadsPath = [System.IO.Path]::Combine($env:USERPROFILE, 'Downloads')

#### Get title, remove special characters at the end.
$Output = & $YtDlpPath $Url --get-title
$Title = $Output -replace ' ', '_' -replace '[^A-Za-z0-9_]', ''

#### Set the output format to MKV
$OutputFormat = 'mkv'

& $YtDlpPath $Url --paths $DownloadsPath -o "$DownloadsPath\$Title.$OutputFormat"
