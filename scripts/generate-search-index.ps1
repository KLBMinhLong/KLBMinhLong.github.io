# Generate search-index.json from Hugo content
$ErrorActionPreference = "Stop"

$contentDir = "content/posts"
$outputFile = "public/search-index.json"

Write-Host "Generating search index..."

$items = @()

# Get categories
$categoriesDir = "public/categories"
if (Test-Path $categoriesDir) {
    Get-ChildItem -Path $categoriesDir -Directory | ForEach-Object {
        $categoryName = $_.Name
        $categoryPath = $_.FullName
        $count = (Get-ChildItem -Path $categoryPath -Recurse -Filter "*.html" | Measure-Object).Count
        
        $items += @{
            type = "category"
            title = $categoryName
            url = "/categories/$categoryName/"
            count = $count
            categories = @($categoryName)
        } | ConvertTo-Json -Compress
    }
}

# Get posts from public directory
$postsDir = "public/posts"
if (Test-Path $postsDir) {
    Get-ChildItem -Path $postsDir -Directory | Where-Object { $_.Name -ne "page" } | ForEach-Object {
        $postDir = $_.FullName
        $htmlFile = Join-Path $postDir "index.html"
        
        if (Test-Path $htmlFile) {
            $htmlContent = Get-Content $htmlFile -Raw
            
            # Extract title
            if ($htmlContent -match '<title>(.*?)</title>') {
                $title = $matches[1] -replace ' - .*', ''
            } else {
                $title = $_.Name
            }
            
            # Extract description
            $description = ""
            if ($htmlContent -match '<meta name="description" content="(.*?)"') {
                $description = $matches[1]
            }
            
            # Extract categories
            $categories = @()
            if ($htmlContent -match 'categories/([^/"]+)') {
                $categories = @($matches[1])
            }
            
            $items += @{
                type = "post"
                title = $title
                url = "/posts/$($_.Name)/"
                description = $description
                content = ($description -replace '<[^>]+>', '')
                categories = $categories
                tags = @()
                date = (Get-Date).ToString("yyyy-MM-dd")
            } | ConvertTo-Json -Compress
        }
    }
}

# Write JSON array
$jsonArray = "[" + ($items -join ",") + "]"
$jsonArray | Out-File -FilePath $outputFile -Encoding UTF8 -NoNewline

Write-Host "Search index generated: $outputFile"
Write-Host "Total items: $($items.Count)"

