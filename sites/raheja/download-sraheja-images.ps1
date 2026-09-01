$ErrorActionPreference = "Continue"

# ============================================================
# S RAHEJA -> RAHEJA NEXT.JS PUBLIC IMAGE DOWNLOADER
# Run this from:
# C:\Users\kanchan Jaiswar\Downloads\meridian-raheja-frontend-vercel-fixed-v4\raheja
#
# It creates:
# public\sraheja\
# and downloads unique Wix-hosted images found on the public
# S Raheja pages listed below.
# ============================================================

$root = Get-Location
$publicRoot = Join-Path $root "public\sraheja"

$pages = @(
    @{ Name = "home";      Url = "https://www.sraheja.com/" },
    @{ Name = "about";     Url = "https://www.sraheja.com/about" },
    @{ Name = "projects";  Url = "https://www.sraheja.com/work" },
    @{ Name = "ongoing";   Url = "https://www.sraheja.com/ongoingprojects" },
    @{ Name = "upcoming";  Url = "https://www.sraheja.com/upcomingprojects" },
    @{ Name = "completed"; Url = "https://www.sraheja.com/completedprojects" },

    @{ Name = "evergreen";  Url = "https://www.sraheja.com/evergreen" },
    @{ Name = "fairfield";  Url = "https://www.sraheja.com/fairfield" },
    @{ Name = "worq";       Url = "https://www.sraheja.com/worq" },
    @{ Name = "la-em";      Url = "https://www.sraheja.com/laem" },
    @{ Name = "verdana";    Url = "https://www.sraheja.com/verdana" },

    @{ Name = "park-eleven"; Url = "https://www.sraheja.com/park-eleven" },
    @{ Name = "pearl-queen"; Url = "https://www.sraheja.com/pearl-queen" },

    @{ Name = "carter-apartments"; Url = "https://www.sraheja.com/carter-apartments" },
    @{ Name = "lachmi-gobind";     Url = "https://www.sraheja.com/lachmi-gobind" },
    @{ Name = "vasant";            Url = "https://www.sraheja.com/vasant" },
    @{ Name = "homeland-homecourt"; Url = "https://www.sraheja.com/homeland-homecourt" }
)

New-Item -ItemType Directory -Force -Path $publicRoot | Out-Null

$headers = @{
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/151 Safari/537.36"
    "Accept" = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
}

function Normalize-ImageUrl {
    param([string]$Url)

    $u = $Url

    $u = $u -replace '\\/', '/'
    $u = $u -replace '&amp;', '&'
    $u = $u -replace '\\u0026', '&'
    $u = $u.Trim('"', "'", ' ', "`r", "`n")

    if ($u -notmatch '^https?://') {
        return $null
    }

    if ($u -notmatch 'static\.wixstatic\.com/media/') {
        return $null
    }

    return $u
}

function Get-ImageUrls {
    param([string]$Html)

    $found = New-Object System.Collections.Generic.HashSet[string]

    # Direct URLs in HTML / Next/Wix JSON.
    $patterns = @(
        'https?:\\?/\\?/static\.wixstatic\.com\\?/media\\?/[^"''<>\s]+',
        'https?://static\.wixstatic\.com/media/[^"''<>\s]+'
    )

    foreach ($pattern in $patterns) {
        $matches = [regex]::Matches(
            $Html,
            $pattern,
            [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
        )

        foreach ($m in $matches) {
            $url = Normalize-ImageUrl $m.Value
            if ($url) {
                [void]$found.Add($url)
            }
        }
    }

    return @($found)
}

function Get-SafeExtension {
    param(
        [string]$Url,
        [string]$ContentType
    )

    $ct = ($ContentType -split ';')[0].ToLower()

    if ($ct -eq "image/png")  { return ".png" }
    if ($ct -eq "image/jpeg") { return ".jpg" }
    if ($ct -eq "image/webp") { return ".webp" }
    if ($ct -eq "image/avif") { return ".avif" }
    if ($ct -eq "image/gif")  { return ".gif" }
    if ($ct -eq "image/svg+xml") { return ".svg" }

    if ($Url -match '\.png(?:[/?]|$)')  { return ".png" }
    if ($Url -match '\.jpe?g(?:[/?]|$)') { return ".jpg" }
    if ($Url -match '\.webp(?:[/?]|$)') { return ".webp" }
    if ($Url -match '\.avif(?:[/?]|$)') { return ".avif" }
    if ($Url -match '\.gif(?:[/?]|$)')  { return ".gif" }
    if ($Url -match '\.svg(?:[/?]|$)')  { return ".svg" }

    return ".jpg"
}

function Get-FileNameFromUrl {
    param(
        [string]$Url,
        [int]$Index,
        [string]$PageName,
        [string]$Extension
    )

    try {
        $decoded = [System.Uri]::UnescapeDataString($Url)
        $last = ($decoded -split '/')[-1]
        $last = ($last -split '\?')[0]

        if ($last -and $last.Length -gt 2) {
            $last = $last -replace '[<>:"/\\|?*]', '_'
            $last = $last -replace '[\r\n]', ''

            if ($last -notmatch '\.[A-Za-z0-9]{2,5}$') {
                $last = "$last$Extension"
            }

            return $last
        }
    }
    catch {}

    return ("{0}-{1:D3}{2}" -f $PageName, $Index, $Extension)
}

$total = 0
$failed = 0
$seen = New-Object System.Collections.Generic.HashSet[string]

foreach ($page in $pages) {

    Write-Host ""
    Write-Host "=====================================================" -ForegroundColor Cyan
    Write-Host "PAGE: $($page.Name)" -ForegroundColor Cyan
    Write-Host "$($page.Url)" -ForegroundColor DarkCyan
    Write-Host "=====================================================" -ForegroundColor Cyan

    $pageDir = Join-Path $publicRoot $page.Name
    New-Item -ItemType Directory -Force -Path $pageDir | Out-Null

    try {
        $response = Invoke-WebRequest `
            -Uri $page.Url `
            -Headers $headers `
            -UseBasicParsing `
            -TimeoutSec 60

        $html = $response.Content
        $urls = Get-ImageUrls $html

        Write-Host "Found $($urls.Count) Wix image URLs." -ForegroundColor Yellow

        $index = 1

        foreach ($imageUrl in $urls) {

            if ($seen.Contains($imageUrl)) {
                continue
            }

            [void]$seen.Add($imageUrl)

            try {
                $head = Invoke-WebRequest `
                    -Uri $imageUrl `
                    -Headers @{
                        "User-Agent" = $headers["User-Agent"]
                        "Accept" = "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
                    } `
                    -Method Head `
                    -UseBasicParsing `
                    -TimeoutSec 30

                $contentType = $head.Headers["Content-Type"]
            }
            catch {
                $contentType = ""
            }

            $ext = Get-SafeExtension $imageUrl $contentType
            $fileName = Get-FileNameFromUrl $imageUrl $index $page.Name $ext
            $destination = Join-Path $pageDir $fileName

            # Avoid collisions.
            $counter = 1
            while (Test-Path $destination) {
                $base = [System.IO.Path]::GetFileNameWithoutExtension($fileName)
                $destination = Join-Path $pageDir ("{0}-{1}{2}" -f $base, $counter, $ext)
                $counter++
            }

            try {
                Invoke-WebRequest `
                    -Uri $imageUrl `
                    -Headers @{
                        "User-Agent" = $headers["User-Agent"]
                        "Accept" = "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
                    } `
                    -OutFile $destination `
                    -UseBasicParsing `
                    -TimeoutSec 90

                if ((Test-Path $destination) -and ((Get-Item $destination).Length -gt 500)) {
                    Write-Host "OK  $destination" -ForegroundColor Green
                    $total++
                    $index++
                }
                else {
                    Write-Host "BAD $imageUrl" -ForegroundColor Red
                    $failed++
                    Remove-Item $destination -Force -ErrorAction SilentlyContinue
                }
            }
            catch {
                Write-Host "FAIL $imageUrl" -ForegroundColor Red
                Write-Host $_.Exception.Message -ForegroundColor DarkRed
                $failed++
            }
        }
    }
    catch {
        Write-Host "PAGE FAILED: $($page.Url)" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor DarkRed
    }
}

Write-Host ""
Write-Host "=====================================================" -ForegroundColor Green
Write-Host "DONE" -ForegroundColor Green
Write-Host "Downloaded: $total images" -ForegroundColor Green
Write-Host "Failed:     $failed" -ForegroundColor Yellow
Write-Host "Folder:     $publicRoot" -ForegroundColor Green
Write-Host "=====================================================" -ForegroundColor Green

Write-Host ""
Write-Host "Check the downloaded files with:" -ForegroundColor Cyan
Write-Host "Get-ChildItem public\sraheja -Recurse -File | Select FullName,Length"
