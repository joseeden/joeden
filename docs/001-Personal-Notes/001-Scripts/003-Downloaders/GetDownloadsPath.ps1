# Get the current user's Downloads folder path
$downloadsPath = [System.IO.Path]::Combine([System.IO.Path]::Combine($env:USERPROFILE, 'Downloads'))

# Print the Downloads folder path
Write-Host "Downloads Folder Path: $downloadsPath"
