import type { FC } from "react";
import { Link } from "react-router";

const Terms: FC = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto bg-surface border border-border rounded-lg p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-text mb-6">Terms of Service</h1>
        <p className="text-text-muted text-sm mb-8">Last updated: December 29, 2025</p>
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-text mb-3">1. About Liiku</h2>
          <p className="text-text-muted">
            Liiku is a personal project of mine that helps you navigate public transportation in the
            Helsinki region. This service is provided as-is for free.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-text mb-3">2. Data Source</h2>
          <p className="text-text-muted">
            Route and schedule data is provided by HSL (Helsinki Region Transport) through their
            public API. Liiku is not affiliated with or endorsed by HSL. Data accuracy depends on
            HSL's services.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-text mb-3">3. No Guarantees</h2>
          <p className="text-text-muted">
            This is a personal project. I don't guarantee uptime, accuracy, or availability. Always
            verify critical travel information through official HSL channels.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-text mb-3">4. Your Account</h2>
          <p className="text-text-muted">
            You're responsible for keeping your login credentials secure. I may delete inactive
            accounts or reset the database during development.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-text mb-3">5. Your Data</h2>
          <p className="text-text-muted">
            I collect only what's needed to provide the service (email, saved routes). I won't sell
            your data. You can request deletion of your account at any time.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-text mb-3">6. Acceptable Use</h2>
          <p className="text-text-muted">
            Don't abuse the service, attempt to access other users' data, or use automated tools to
            scrape data.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-text mb-3">7. Changes</h2>
          <p className="text-text-muted">
            I may update these terms as the project evolves. Continued use means you accept any
            changes.
          </p>
        </section>

        <Link to="/signup" className="text-accent hover:underline font-medium">
          ← Back to signup
        </Link>
      </div>
    </div>
  );
};

export default Terms;
