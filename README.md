🧠 Mental Health Tracker App
A beautifully designed, fullstack mental wellness companion built with Next.js + TypeScript, integrating Vapi AI voice agents for conversational support. The app helps users track mood, log sleep and stress levels, write journal entries, and set personal goals, while offering secure authentication, real-time storage, and responsive UI.

🌟 Key Features
🎙️ Voice Assistant powered by Vapi AI for conversational well-being check-ins

😊 Daily Mood Tracking with emotion selection

💤 Sleep Hours Logging

😟 Stress Level Recording

📓 Journal Entries with secure storage

🎯 Goal Setting to support healthy habits

🔐 User Authentication via Clerk

☁️ Supabase Backend for realtime storage

💅 Modern UI built with Tailwind, shadcn/ui, Magic UI, and Lucide Icons

🧱 Tech Stack
Tech	Role
Next.js	Frontend framework with SSR/ISR support
TypeScript	Static type checking
Vapi AI	Conversational voice agents
Supabase	Backend database and API
Clerk	Auth and session management
Tailwind CSS	Styling using utility-first CSS
shadcn/ui	Composable and accessible UI components
Magic UI	Enhanced animations & visual polish
Lucide Icons	Clean and consistent icon set

🗂️ Project Structure
bash
Copy
Edit
/app              # Next.js App Routes & Layouts
/components       # Reusable UI and form components
/lib              # Utility functions and Supabase/Clerk setup
/types            # Custom TypeScript definitions
/styles           # Tailwind and global CSS
/public           # Static assets (icons, images)
.env.local        # Your environment config
📥 Environment Variables
Create a .env.local file in the root with:

env
Copy
Edit
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
VAPI_API_KEY=your_vapi_api_key
🚀 Getting Started
Clone the repo

bash
Copy
Edit
git clone https://github.com/yourusername/mental-health-tracker.git
cd mental-health-tracker
Install dependencies

bash
Copy
Edit
npm install
Run locally

bash
Copy
Edit
npm run dev
Open http://localhost:3000

🔍 Core Modules
/components/Tracker.tsx – Mood, Sleep, Stress input

/components/Journal.tsx – Daily journal UI

/components/Goals.tsx – Goal creation and status

/components/VoiceAgent.tsx – Vapi AI integration

/lib/supabase.ts – Realtime syncing with Supabase

/lib/clerk.ts – User auth handling

📊 Charts & Insights
Uses Recharts to visualize:

Mood trends over time

Sleep duration

Stress patterns

Goal progress

🎨 UI Components
shadcn/ui: Accessible building blocks (dialogs, cards, inputs)

Magic UI: Motion effects and beautiful layouts

Lucide: Icon system for clean UI feedback

✈️ Deployment
Best deployed on Vercel or any Node-based platform:

Push to GitHub

Connect to Vercel

Set up environment variables

Deploy!

🙌 Contributing
We welcome contributions to improve the app!

bash
Copy
Edit
# Fork it
git checkout -b feature/my-feature
git commit -m "Add feature"
git push origin feature/my-feature
📄 License
MIT License – Free to use and modify with attribution.

💚 Credits
Vapi AI

Supabase

Clerk

shadcn/ui

Magic UI

Lucide Icons

