export default function PostContent() {
  return (
    <div>
      <p>
        <strong>Can you become an AI automation specialist without a computer science degree?</strong> Yes. AI
        automation is one of the few technical fields where proof of work matters more than a qualification. If you
        can learn n8n, understand how APIs and webhooks move data between tools, build AI agents that do useful work,
        and show working projects, companies will consider you, wherever you live.
      </p>
      <p>
        This guide explains what an AI automation specialist actually does, which skills you need, how long it
        takes, and how to turn what you learn into a placement. It draws on what graduates of The Gate Project, a
        6-week AI training and placement programme for African professionals, have done coming from healthcare,
        medicine, engineering and finance.
      </p>

      <h2>What does an AI automation specialist do?</h2>
      <p>
        An AI automation specialist designs and builds systems that take over repetitive business work: qualifying
        leads, answering customer questions, processing documents, chasing overdue invoices, booking appointments,
        sending alerts. The work usually combines three layers:
      </p>
      <ul>
        <li>
          <strong>A workflow engine</strong> such as n8n that connects apps (Gmail, Google Sheets, Airtable, Supabase,
          WhatsApp, Telegram, CRMs) and runs the logic between them.
        </li>
        <li>
          <strong>An AI layer</strong> built on a language model such as Claude, GPT or Gemini that reads messy input,
          makes a decision or drafts a response.
        </li>
        <li>
          <strong>A business rule layer</strong> that decides what happens next, when a human must approve, and what
          to do when something fails.
        </li>
      </ul>
      <p>
        The job is less about writing code and more about understanding a business process well enough to automate
        it reliably.
      </p>

      <h2>Do you need to know how to code?</h2>
      <p>
        Not to start. n8n is a visual workflow tool, and many useful automations need no code at all. Basic
        JavaScript becomes useful later, for small transformations in n8n&apos;s Code node, and a working
        understanding of JSON, APIs and webhooks helps from the first week. Treat coding as something you pick up
        through projects rather than a prerequisite you must finish first.
      </p>
      <p>
        What matters more at the start is process thinking: breaking a messy real-world task into inputs, decisions
        and outputs. People from operations, finance, healthcare and engineering often do this well because they
        have lived inside inefficient processes.
      </p>

      <h2>Which skills should you learn, in what order?</h2>
      <ol>
        <li>
          <strong>Workflow fundamentals in n8n.</strong> Triggers, nodes, expressions, branching, error handling, and
          connecting your first apps.
        </li>
        <li>
          <strong>APIs and webhooks.</strong> How tools talk to each other, how to read API documentation, and how to
          receive and send data.
        </li>
        <li>
          <strong>AI agents and prompting.</strong> Giving a model clear instructions, tools and memory, and
          constraining its output so it behaves predictably in a business setting.
        </li>
        <li>
          <strong>Channels.</strong> WhatsApp and Telegram bots, email automation, and voice agents, because that is
          where businesses actually reach their customers.
        </li>
        <li>
          <strong>Generative Engine Optimization (GEO).</strong> Making a business visible in answers from tools like
          ChatGPT, Perplexity and Google&apos;s AI Overviews. It pairs naturally with automation, because many
          clients want both.
        </li>
        <li>
          <strong>Reliability.</strong> Monitoring, alerts when a workflow fails, and documenting what you built so
          someone else can maintain it.
        </li>
      </ol>

      <h2>What projects prove you can do the job?</h2>
      <p>
        Employers and clients trust projects they can see working. The strongest portfolio pieces solve a recognisable
        business problem end to end. Examples of what Gate Project graduates have built include:
      </p>
      <ul>
        <li>A WhatsApp-driven hotel maintenance system where an AI agent splits informal messages into tickets.</li>
        <li>A contract-tracking workflow that reads Gmail, extracts key details and escalates unsigned contracts.</li>
        <li>An overdue-invoice recovery workflow for finance teams that prioritises receivables and sends follow-ups.</li>
        <li>A voice agent that phones patients to confirm, reschedule or cancel clinic appointments.</li>
        <li>A CV screening agent that triages candidates for recruitment agencies.</li>
        <li>A lead qualification and outreach pipeline that scores prospects with the Claude API.</li>
      </ul>
      <p>
        Notice that none of these are toy exercises. Each one has a real user, a trigger, a decision and an outcome.
        Five to eight projects like these, each with a short write-up of the problem and result, is a stronger
        application than a certificate.
      </p>

      <h2>How long does it take?</h2>
      <p>
        With structured, hands-on training and real projects, six weeks is enough to build working automations and a
        starter portfolio. That is the length of The Gate Project programme. Becoming genuinely fluent takes longer
        and comes from building for real clients and employers. Self-study without projects or feedback usually takes
        much longer, because it is easy to keep watching tutorials without building anything.
      </p>

      <h2>How do you get placed or hired?</h2>
      <ul>
        <li>
          <strong>Show working systems, not just a CV.</strong> Record short demos of each project and link them from
          your LinkedIn profile.
        </li>
        <li>
          <strong>Position yourself around an outcome.</strong> &ldquo;I build systems that recover overdue
          invoices&rdquo; is clearer than &ldquo;I know n8n&rdquo;.
        </li>
        <li>
          <strong>Use your previous career as an advantage.</strong> A finance professional who automates
          reconciliation, or a healthcare professional who automates patient communication, is more credible than a
          generalist.
        </li>
        <li>
          <strong>Get introduced, not just listed.</strong> Introductions from a programme or network that employers
          already trust shorten the path considerably.
        </li>
      </ul>
      <p>
        Since May, graduates of The Gate Project have secured more than 15 placements, with some placed more than
        once. You can read a selection of their stories on the <a href="/alumni">alumni page</a>.
      </p>

      <h2>Common mistakes to avoid</h2>
      <ul>
        <li>Collecting courses instead of building projects.</li>
        <li>Building workflows that only work on the happy path and never handle errors.</li>
        <li>Giving an AI agent too much freedom, instead of tight instructions and clear limits.</li>
        <li>Skipping documentation, which makes your work hard for an employer to trust or hand over.</li>
        <li>Waiting until you feel ready before showing your work publicly.</li>
      </ul>

      <h2>Frequently Asked Questions</h2>
      <dl>
        <dt>Do I need a tech background to become an AI automation specialist?</dt>
        <dd>
          No. Several Gate Project graduates started with backgrounds in healthcare, medicine, engineering and
          finance, or with no experience beyond using ChatGPT. What they had in common was a willingness to build
          real projects.
        </dd>
        <dt>Is n8n free to learn?</dt>
        <dd>
          n8n can be self-hosted and also offers a hosted cloud version. Self-hosting is a good way to learn how the
          tool connects to outside services, though it adds setup work. Check n8n&apos;s current pricing and licence
          terms before building for a client.
        </dd>
        <dt>Can I work remotely for companies abroad from Africa?</dt>
        <dd>
          Yes. Many automation and GEO roles are fully remote. Strong portfolio evidence and a clear positioning
          statement matter more than your location.
        </dd>
        <dt>What is the difference between AI automation and GEO?</dt>
        <dd>
          AI automation builds systems that do work for a business. GEO (Generative Engine Optimization) makes a
          business visible in AI-generated search answers. Many roles combine both.
        </dd>
        <dt>Where can I learn this with support?</dt>
        <dd>
          The Gate Project runs a 6-week programme covering AI automation with n8n, GEO, LinkedIn authority and lead
          generation, with introductions to hiring companies. Cohort 4 begins in January and applications are open on
          the <a href="/apply">Apply page</a>.
        </dd>
      </dl>
    </div>
  );
}
