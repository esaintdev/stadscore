
import React from 'react';

const Terms = () => {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
      <p className="text-muted-foreground">Last updated: May 14, 2025</p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Introduction</h2>
        <p>
          Welcome to Stadscore ("we", "our", or "us"). By accessing or using our website at stadscore.com ("the Service"), you agree to be bound by these Terms of Service ("Terms").
        </p>
        <p>
          Please read these Terms carefully. If you disagree with any part of these Terms, you may not access the Service.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Use of the Service</h2>
        <h3 className="text-xl font-medium">2.1 Eligibility</h3>
        <p>
          You must be at least 18 years of age to use the Service. By using the Service, you represent and warrant that you are at least 18 years of age and have the legal capacity to enter into these Terms.
        </p>

        <h3 className="text-xl font-medium">2.2 User Accounts</h3>
        <p>
          When you create an account with us, you must provide accurate, complete, and current information. You are solely responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device.
        </p>

        <h3 className="text-xl font-medium">2.3 Acceptable Use</h3>
        <p>
          You agree not to use the Service:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>In any way that violates any applicable laws or regulations</li>
          <li>To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Service</li>
          <li>To attempt to gain unauthorized access to any portion of the Service</li>
          <li>To upload or transmit viruses, malware, or other malicious code</li>
          <li>To collect or track the personal information of others</li>
          <li>To spam, phish, or engage in any other unwanted solicitation</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">3. Content</h2>
        <h3 className="text-xl font-medium">3.1 Service Content</h3>
        <p>
          Our Service allows you to access content including live scores, match information, odds, statistics, and articles ("Content"). The Content is protected by copyright, trademark, and other intellectual property laws.
        </p>
        <p>
          You may access the Content for your personal, non-commercial use only. You may not download, copy, reproduce, distribute, transmit, display, sell, license, or otherwise exploit any Content without our prior written consent.
        </p>

        <h3 className="text-xl font-medium">3.2 Accuracy of Information</h3>
        <p>
          While we strive to provide accurate and up-to-date information, we cannot guarantee the accuracy, completeness, or timeliness of the Content. You acknowledge that any reliance on the Content is at your own risk.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">4. Third-Party Links and Services</h2>
        <p>
          Our Service may contain links to third-party websites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
        </p>
        <p>
          You acknowledge and agree that we shall not be responsible or liable for any damage or loss caused by or in connection with your use of any third-party websites or services.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">5. Odds and Betting Information</h2>
        <p>
          The odds and betting information provided on our Service is for informational purposes only. We do not provide betting services, and we are not affiliated with any betting operators unless explicitly stated.
        </p>
        <p>
          You are responsible for complying with all applicable laws regarding online gambling in your jurisdiction. We do not encourage or endorse illegal gambling.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">6. Disclaimer of Warranties</h2>
        <p>
          THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </p>
        <p>
          WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, OR THAT ANY DEFECTS WILL BE CORRECTED.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">7. Limitation of Liability</h2>
        <p>
          IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE</li>
          <li>ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE</li>
          <li>ANY CONTENT OBTAINED FROM THE SERVICE</li>
          <li>UNAUTHORIZED ACCESS, USE OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">8. Changes</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page and updating the "Last updated" date.
        </p>
        <p>
          You are advised to review these Terms periodically for any changes. By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised Terms.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">9. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us:
        </p>
        <p>
          By email: terms@stadscore.com<br />
          By phone: +1 (555) 123-4567<br />
          By mail: 123 Football Street, Scoretown, SC 12345
        </p>
      </section>
    </div>
  );
};

export default Terms;
