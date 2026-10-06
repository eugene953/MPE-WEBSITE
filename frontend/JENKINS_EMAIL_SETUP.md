# Jenkins email notifications with Ethereal

The pipeline sends SUCCESS, UNSTABLE, and FAILURE notifications directly to Ethereal over SMTP. Ethereal captures messages for preview and never delivers them to the recipient address.

Before running the job, add the Ethereal account to Jenkins Credentials:

1. Open **Manage Jenkins → Credentials** and add a **Username with password** credential.
2. Set the ID to `ethereal-smtp` and use the Ethereal SMTP username and password.
3. Run the pipeline. The username and password are injected as masked environment variables and are not stored in this repository.
4. Sign in to the Ethereal mailbox to preview the captured notification. The message recipient remains `nfouaeugene545@gmail.com`, but Ethereal does not deliver to that inbox.

The pipeline connects to `smtp.ethereal.email` on port `587` with STARTTLS. This direct SMTP configuration avoids relying on Jenkins' global mailer settings or its default `localhost:25` server.
