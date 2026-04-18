import React, { FunctionComponent, FormEvent, useState } from "react";
import styles from "./LetsTalk.module.scss";

type FormStatus = "idle" | "success" | "error";

const FORM_ENDPOINT = "https://formsubmit.co/ajax/josemanuelitoeden@gmail.com";

export const LetsTalk: FunctionComponent = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit message");
      }

      form.reset();
      setStatus("success");
    } catch (_error) {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.letsTalkSection} aria-label="Let's Talk" id="lets-talk">
      <h2 className={styles.letsTalkTitle}>LET&apos;S TALK</h2>
      <p className={styles.letsTalkIntro}>
        Have an idea? Let&apos;s talk and make it happen.
      </p>

      <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
        <input type="hidden" name="_subject" value="New message from joseeden.site" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="text" name="_honey" className={styles.honeyField} tabIndex={-1} autoComplete="off" />

        <div className={styles.rowFields}>
          <label className={styles.fieldLabel}>
            <span>Name</span>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              autoComplete="name"
              required
              className={styles.inputField}
            />
          </label>

          <label className={styles.fieldLabel}>
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              required
              className={styles.inputField}
            />
          </label>
        </div>

        <label className={styles.fieldLabel}>
          <span>Message</span>
          <textarea
            name="message"
            placeholder="Tell me about your project..."
            rows={5}
            required
            className={styles.messageField}
          />
        </label>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send message"}
          </button>
        </div>

        <div className={styles.statusRegion} role="status" aria-live="polite">
          {status === "success" && (
            <p className={styles.successMessage}>Message sent. I&apos;ll get back to you soon.</p>
          )}
          {status === "error" && (
            <p className={styles.errorMessage}>Something went wrong. Please try again.</p>
          )}
        </div>
      </form>
    </section>
  );
};
