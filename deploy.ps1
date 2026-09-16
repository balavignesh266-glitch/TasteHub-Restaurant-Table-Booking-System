# Locate Git executable
$gitPath = $null

if (Get-Command git -ErrorAction SilentlyContinue) {
    $gitPath = "git"
} else {
    $candidates = @(
        "C:\Program Files\Git\cmd\git.exe",
        "C:\Program Files\Git\bin\git.exe",
        "C:\Program Files (x86)\Git\cmd\git.exe",
        "C:\Program Files (x86)\Git\bin\git.exe",
        "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe",
        "$env:LOCALAPPDATA\Programs\Git\bin\git.exe"
    )
    foreach ($cand in $candidates) {
        if (Test-Path $cand) {
            $gitPath = $cand
            break
        }
    }
}

if (-not $gitPath) {
    Write-Host "GIT_NOT_FOUND: Git is not installed on this machine."
    exit 1
}

Write-Host "Found Git at: $gitPath"
& $gitPath --version

Set-Location "c:\anudip\restaurant-booking"

& $gitPath init
& $gitPath config user.name "balavignesh266-glitch"
& $gitPath config user.email "balavignesh266@gmail.com"
& $gitPath add -A
& $gitPath commit -m "Deploy TasteHub Restaurant Table Booking System"
& $gitPath branch -M main

try {
    & $gitPath remote remove origin 2>$null
} catch {}

& $gitPath remote add origin "https://github.com/balavignesh266-glitch/TasteHub-Restaurant-Table-Booking-System.git"

Write-Host "Pushing to GitHub repository..."
& $gitPath push -u origin main --force
