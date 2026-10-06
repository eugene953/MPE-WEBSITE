# Jenkins email notifications with Ethereal

The pipeline sends SUCCESS, UNSTABLE, and FAILURE notifications directly to Ethereal over SMTP. Ethereal captures messages for preview and never delivers them to the recipient address.

Before running the job, add the Ethereal account to Jenkins Credentials:

1. Open **Manage Jenkins → Credentials** and add a **Username with password** credential.
2. Ensure the credential is saved in the **System → Global** store so this job can read it.
3. Run the pipeline. The username and password are injected as masked environment variables and are not stored in this repository.
4. Sign in to the Ethereal mailbox to preview the captured notification. The message recipient remains `nfouaeugene545@gmail.com`, but Ethereal does not deliver to that inbox.

The Jenkinsfile uses the credential ID configured for this Ethereal account. The pipeline connects to `smtp.ethereal.email` on port `587` with STARTTLS, avoiding Jenkins' global mailer settings and its default `localhost:25` server.

The Docker image stage requires Docker Desktop's Linux engine to be running and available to the Jenkins service account. The pipeline checks `docker info` first; if the engine is unavailable, it skips the image build and marks the run UNSTABLE. Start Docker Desktop and make sure the Jenkins account can access its Linux engine before rerunning.
