$ErrorActionPreference = 'Stop'

if (-not $env:ETHEREAL_SMTP_USER -or -not $env:ETHEREAL_SMTP_PASSWORD) {
    throw 'Ethereal SMTP credentials are not available in the Jenkins environment.'
}

$bodyMessage = switch ($env:EMAIL_STATUS) {
    'SUCCESS' { 'Pipeline completed successfully.' }
    'UNSTABLE' { 'Pipeline completed with an unstable status.' }
    'FAILURE' { 'Pipeline failed. Review the Jenkins build log for details.' }
    default { throw "Unsupported build status: $env:EMAIL_STATUS" }
}

$message = [System.Net.Mail.MailMessage]::new()
$client = [System.Net.Mail.SmtpClient]::new('smtp.ethereal.email', 587)

try {
    $message.From = [System.Net.Mail.MailAddress]::new($env:ETHEREAL_SMTP_USER)
    $message.To.Add('nfouaeugene545@gmail.com')
    $message.Subject = "$($env:EMAIL_STATUS) Pipeline: $($env:EMAIL_BUILD_NAME)"
    $message.Body = "$bodyMessage`r`nBuild URL: $($env:EMAIL_BUILD_URL)"
    $message.BodyEncoding = [System.Text.Encoding]::UTF8
    $message.SubjectEncoding = [System.Text.Encoding]::UTF8

    $client.EnableSsl = $true
    $client.Credentials = [System.Net.NetworkCredential]::new(
        $env:ETHEREAL_SMTP_USER,
        $env:ETHEREAL_SMTP_PASSWORD
    )
    $client.Send($message)
    Write-Output "${env:EMAIL_STATUS} notification captured by Ethereal."
} finally {
    $message.Dispose()
    $client.Dispose()
}
