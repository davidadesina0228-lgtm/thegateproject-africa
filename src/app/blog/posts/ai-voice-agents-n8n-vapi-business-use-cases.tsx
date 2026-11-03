import { telegramLinkProps } from "@/lib/site";

export default function PostContent() {
  return (
    <div>
      <p>
        <strong>What is an AI voice agent?</strong> An AI voice agent is a phone or web-call assistant that listens
        to a person, understands what they want, takes an action in a business system, and replies in natural speech.
        Built with a voice platform such as Vapi and a workflow engine such as n8n, a voice agent can confirm
        appointments, qualify leads, check stock or answer common questions without a human on the line.
      </p>
      <p>
        Voice agents are one of the most practical things a new AI automation specialist can build, because the
        value is easy to see: a call that used to need a person is now handled automatically. This article explains
        how they work and walks through five real use cases built by graduates of The Gate Project.
      </p>

      <h2>How does a voice agent with n8n and Vapi work?</h2>
      <p>The architecture has two halves:</p>
      <ul>
        <li>
          <strong>The voice platform (for example, Vapi)</strong> handles the call itself: telephony or web calling,
          turning speech into text, passing the conversation to a language model, and turning the reply back into
          speech. You configure the assistant&apos;s instructions, voice and the tools it is allowed to use.
        </li>
        <li>
          <strong>The workflow engine (n8n)</strong> handles the business actions. When the agent needs to check a
          calendar, look up a customer, update a spreadsheet or send a confirmation, it calls an n8n webhook. n8n
          runs the steps and returns a short result the agent can read out.
        </li>
      </ul>
      <p>
        Keeping the conversation in the voice platform and the business logic in n8n makes the system easier to
        build, test and change. You can improve the workflow without touching the call setup, and the reverse.
      </p>

      <h2>Use case 1: Appointment confirmation, rescheduling and cancellation</h2>
      <p>
        A clinic voice agent phones patients ahead of their appointment, asks whether they can attend, and then
        confirms, reschedules or cancels the booking in the clinic&apos;s system. The n8n workflow checks available
        slots, updates the record and can notify staff when a cancellation frees up a time. This is a strong starter
        project because the conversation is short, the possible outcomes are limited and the benefit, fewer missed
        appointments, is easy to explain.
      </p>

      <h2>Use case 2: Inbound appointment booking</h2>
      <p>
        The reverse of the first: a customer calls, and the agent finds a free slot, books it, and sends a
        confirmation. The n8n side typically reads availability, writes the booking and triggers a message to the
        customer and the business.
      </p>

      <h2>Use case 3: Speed-to-lead calling</h2>
      <p>
        When a new lead fills in a form, the best time to contact them is within minutes. A speed-to-lead voice agent
        is triggered by the form submission, calls the lead, asks a few qualifying questions and logs the answers.
        One Gate Project graduate built this with n8n and Vapi, including demo calls to a Nigerian number and a
        web-call option so prospects could try it without a phone.
      </p>

      <h2>Use case 4: Stock and product information for an online store</h2>
      <p>
        A voice assistant for an e-store needs live data, not guesses. Backend tools built in n8n let the agent check
        whether an item is in stock and read out product details in real time, so it never promises something the
        store cannot deliver.
      </p>

      <h2>Use case 5: A voice tutor</h2>
      <p>
        Voice agents are not only for customers. One graduate built a voice teacher that reviews n8n concepts with
        learners and gives pointers on where to improve, an example of using the same building blocks for training and
        internal support.
      </p>

      <h2>How do you make a voice agent reliable?</h2>
      <ul>
        <li>
          <strong>Keep each call goal narrow.</strong> An agent that does one job well beats one that tries to do
          everything.
        </li>
        <li>
          <strong>Confirm important details out loud.</strong> Repeat back names, dates and phone numbers before
          acting on them, because speech recognition makes mistakes.
        </li>
        <li>
          <strong>Return short answers from n8n.</strong> A voice agent reads results aloud, so a long data dump
          creates awkward pauses. Return one clear sentence or value.
        </li>
        <li>
          <strong>Plan for failure.</strong> If a webhook fails or the caller asks for something unexpected, the agent
          should apologise, offer a human handoff or take a message instead of improvising.
        </li>
        <li>
          <strong>Mind latency.</strong> Every extra step in the workflow adds a pause in the conversation. Do the
          minimum needed during the call and handle slower tasks afterwards.
        </li>
        <li>
          <strong>Respect consent and local rules.</strong> Calling and recording people can be regulated. Tell
          callers they are speaking to an AI and check the rules for the countries you call.
        </li>
        <li>
          <strong>Test with real conversations.</strong> People interrupt, mumble and change their minds. Test with
          messy calls, not just clean scripts.
        </li>
      </ul>

      <h2>What should you build first?</h2>
      <p>
        Start with appointment confirmation. It needs one webhook, one data source and a short conversation. Once it
        works, extend it to rescheduling, then add a second channel such as a WhatsApp follow-up message. Record a
        short demo call and write up the problem and result. That single project, done properly, is a credible
        portfolio piece.
      </p>
      <p>
        If you want to learn this with guidance, the voice agent builds above came out of The Gate Project&apos;s
        6-week programme. You can see more of what graduates built on the <a href="/alumni">alumni page</a>.
      </p>

      <h2>Frequently Asked Questions</h2>
      <dl>
        <dt>What is Vapi?</dt>
        <dd>
          Vapi is a platform for building voice AI agents. It handles phone and web calls, speech-to-text, the
          language model conversation and text-to-speech, and can call out to your own tools through webhooks.
        </dd>
        <dt>Why use n8n with a voice agent?</dt>
        <dd>
          n8n runs the business logic behind the conversation: checking calendars, updating spreadsheets or CRMs,
          sending confirmations and logging results. It lets you build those actions visually and change them without
          rebuilding the voice assistant.
        </dd>
        <dt>Do I need to code to build a voice agent?</dt>
        <dd>
          Not necessarily. Much of the setup is configuration and visual workflow building. Basic understanding of
          APIs, webhooks and JSON helps a great deal.
        </dd>
        <dt>What businesses benefit most from voice agents?</dt>
        <dd>
          Businesses that handle many repetitive calls: clinics and healthcare providers, service businesses taking
          bookings, sales teams following up leads, and online stores answering stock questions.
        </dd>
        <dt>Where can I learn to build these?</dt>
        <dd>
          The Gate Project teaches AI automation with n8n, including voice agents and chatbots, in a 6-week
          programme. Cohort 4 begins in January. Apply through our <a {...telegramLinkProps}>Telegram group</a>.
        </dd>
      </dl>
    </div>
  );
}
