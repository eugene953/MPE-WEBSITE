# Jenkins email notifications with Ethereal

Ethereal is a test SMTP service. It captures messages for preview and never delivers them to the recipient address. Use it to verify the Jenkins notification content without sending mail to a real inbox.

1. Create an Ethereal test account at <https://ethereal.email/> and keep its SMTP username and password available.
2. In Jenkins, add the username and password as a Jenkins credential (Manage Jenkins → Credentials).
3. Open Manage Jenkins → Configure System → E-mail Notification and set:
   - SMTP server: `smtp.ethereal.email`
   - SMTP port: `587`
   - Use SMTP Authentication: enabled, with the Ethereal credential
   - Use TLS: enabled (STARTTLS)
   - From address: the generated Ethereal username
4. Save the configuration and run this pipeline. Open the Ethereal account’s message preview to inspect the captured SUCCESS, UNSTABLE, or FAILURE email.

Do not commit SMTP credentials to this repository. The Jenkinsfile uses Jenkins’ configured mailer settings, and logs notification errors without changing the build result.
