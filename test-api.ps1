# Simple API Test Script
Write-Host "🧪 Testing Firebase Functions API..." -ForegroundColor Green

# Test the API endpoint (should return 401 without auth)
Write-Host "`n📡 Testing API without auth token (expecting 401):" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://127.0.0.1:5001/interview-project-c4b60/us-central1/api/api/user/profile" -ErrorAction Stop
    Write-Host "❌ Unexpected success: $($response.StatusCode)" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode.Value__ -eq 401) {
        Write-Host "✅ API working correctly - 401 Unauthorized (auth required)" -ForegroundColor Green
    } else {
        Write-Host "❌ Unexpected error: $($_.Exception.Response.StatusCode.Value__)" -ForegroundColor Red
    }
}

Write-Host "`n🌐 Emulator URLs:" -ForegroundColor Cyan
Write-Host "   • Main UI: http://127.0.0.1:4000/" -ForegroundColor White
Write-Host "   • Auth: http://127.0.0.1:4000/auth (create test users here)" -ForegroundColor White
Write-Host "   • Functions: http://127.0.0.1:4000/functions" -ForegroundColor White
Write-Host "   • Firestore: http://127.0.0.1:4000/firestore" -ForegroundColor White
Write-Host "   • Database: http://127.0.0.1:4000/database" -ForegroundColor White

Write-Host "`n📋 API Endpoints:" -ForegroundColor Cyan
$baseUrl = "http://127.0.0.1:5001/interview-project-c4b60/us-central1/api"
Write-Host "   • POST $baseUrl/api/user/profile" -ForegroundColor White
Write-Host "   • GET  $baseUrl/api/user/profile" -ForegroundColor White
Write-Host "   • PUT  $baseUrl/api/user/profile" -ForegroundColor White
Write-Host "   • POST $baseUrl/api/clients" -ForegroundColor White
Write-Host "   • GET  $baseUrl/api/clients" -ForegroundColor White
Write-Host "   • POST $baseUrl/api/chat/send" -ForegroundColor White
Write-Host "   • GET  $baseUrl/api/chat/messages" -ForegroundColor White

Write-Host "`n🔑 To test with authentication:" -ForegroundColor Yellow
Write-Host "   1. Go to: http://127.0.0.1:4000/auth" -ForegroundColor Gray
Write-Host "   2. Add test user (test@example.com / password123)" -ForegroundColor Gray
Write-Host "   3. Copy the ID token" -ForegroundColor Gray
Write-Host "   4. Use: Authorization: Bearer YOUR_TOKEN" -ForegroundColor Gray

Write-Host "`n✅ All 4 emulators are required for full functionality!" -ForegroundColor Green
