import {translate} from "@docusaurus/Translate";
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
    <section className={styles.letsTalkSection} aria-label={translate({id: "homepage.contact.label", message: "Let's Talk"})} id="lets-talk">
      <h2 className={styles.letsTalkTitle}>{translate({id: "homepage.contact.title", message: "LET'S TALK"})}</h2>
      <p className={styles.letsTalkIntro}>
        {translate({id: "homepage.contact.intro", message: "Have an idea? Let's talk and make it happen."})}
      </p>

      <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
        <input type="hidden" name="_subject" value="New message from joseeden.site" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="text" name="_honey" className={styles.honeyField} tabIndex={-1} autoComplete="off" />

        <div className={styles.rowFields}>
          <label className={styles.fieldLabel}>
            <span>{translate({id: "homepage.contact.name", message: "Name"})}</span>
            <input
              type="text"
              name="name"
              placeholder={translate({id: "homepage.contact.namePlaceholder", message: "Your name"})}
              autoComplete="name"
              required
              className={styles.inputField}
            />
          </label>

          <label className={styles.fieldLabel}>
            <span>{translate({id: "homepage.contact.email", message: "Email"})}</span>
            <input
              type="email"
              name="email"
              placeholder={translate({id: "homepage.contact.emailPlaceholder", message: "your@email.com"})}
              autoComplete="email"
              required
              className={styles.inputField}
            />
          </label>
        </div>

        <label className={styles.fieldLabel}>
          <span>{translate({id: "homepage.contact.message", message: "Message"})}</span>
          <textarea
            name="message"
            placeholder={translate({id: "homepage.contact.messagePlaceholder", message: "Tell me about your project..."})}
            rows={5}
            required
            className={styles.messageField}
          />
        </label>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? translate({id: "homepage.contact.sending", message: "Sending..."}) : translate({id: "homepage.contact.send", message: "Send message"})}
          </button>
        </div>

        <div className={styles.statusRegion} role="status" aria-live="polite">
          {status === "success" && (
            <p className={styles.successMessage}>{translate({id: "homepage.contact.success", message: "Message sent. I'll get back to you soon."})}</p>
          )}
          {status === "error" && (
            <p className={styles.errorMessage}>{translate({id: "homepage.contact.error", message: "Something went wrong. Please try again."})}</p>
          )}
        </div>
      </form>
    </section>
  );
};
