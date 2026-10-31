---
title: Privacy Policy
permalink: /privacy/
---

# CalDefiq Privacy Policy

**Last updated:** [[OWNER: date you publish]]

**Who we are:** CalDefiq is provided by [[OWNER: legal entity name, or your full legal name if you publish as an individual]], [[OWNER: postal address]] ("we", "us").
**Contact:** [[OWNER: support / privacy email]]
**Website:** [[OWNER: confirm domain, e.g. caldefiq.com is proposed but NOT confirmed owned]]

---

## 1. The short version

- CalDefiq is a calorie, nutrition and fitness tracker. To work, it stores what you log (meals, weight, workouts and similar) in your private account.
- **We never show ads, and we never will.** CalDefiq contains no advertising software and no ad tracking. We do not sell your data and we do not share it with data brokers or advertisers.
- When you scan a meal photo with AI, the photo is sent to **OpenAI** to be analysed. We do not keep the photo.
- You can **export** your data or **delete your account** at any time in the app: **Settings (gear icon on the Home tab) → Data & Privacy**.

---

## 2. What we collect, and why

We only collect what the app needs to work. "Your account" below means our database, hosted by Supabase (see section 4).

### 2.1 Account details
| What | Why |
|---|---|
| Email address | To create your account, sign you in, and send you sign-in and password-reset codes. |
| Password (if you sign up with email) | To sign you in. It is stored only as a secure hash by our sign-in provider (Supabase Auth). We never see it. |
| Your name (optional) | To greet you in the app. If you use **Sign in with Apple**, Apple may share your first name the first time you sign in; we keep only the first name. |
| Sign-in provider details | If you choose **Sign in with Apple** or **Continue with Google**, that provider confirms who you are and shares your email (Apple may give you a private "Hide My Email" relay address). |
| A user ID | A random code that links your data to your account. |

### 2.2 Body and health details you enter
Sex, age (stored as birth year), height, weight, activity level, your goal (lose, maintain or gain), target weight, calorie and macro targets, weight history, optional body measurements (waist, hips, chest, arm, thigh, neck, body-fat percentage) and notes.
**Why:** to calculate your calorie target and show your progress. **This is health information.** We use it only to run CalDefiq for you.

### 2.3 Food, water and fitness logs
Meals and foods you log (name, portion, calories, protein, carbs, fat), saved meals and recipes, custom foods, corrections you save, water intake, workouts (type, duration, sets, reps, weights, distances, estimated calories burned) and your step goal.
**Why:** this is the core of the app.

### 2.4 Steps and recorded walks
- **Steps:** with your permission ("Motion & Fitness"), CalDefiq reads your iPhone's daily step count. We store one total per day in your account so it follows you to a new phone.
- **Recorded walks:** only when you tap **Start** on a walk, CalDefiq uses your location to draw your route, measure distance and estimate calories. If you allow it, tracking continues while your phone is locked, until you tap Finish. We store the walk's start and end time, distance, steps, calorie estimate and the **route (GPS points)** in your account. Nothing is recorded before you tap Start or after you finish. You can delete any walk.

### 2.5 Location for "detect my country"
If you tap the button to detect your country, CalDefiq asks for your location once, at the lowest accuracy, and turns it into a country code using Apple's location service on your phone. **The coordinates are thrown away**; only the country you confirm is saved. You can also pick your country by hand.

### 2.6 Region and preferences
Country, region, language/locale, time zone, currency, units (kg/lb, cm/ft, ml/fl oz, km/mi), favourite cuisines, reminder settings and other app preferences.
**Why:** to show the right units, local dishes and prices, and to reset daily limits at midnight in your own time zone.

### 2.7 Photos
- **Meal photos for AI scanning:** when you scan a meal (or a "Before & After" leftovers photo), the photo is sent from your phone to our server and from there to **OpenAI** for analysis. **We do not store the photo.** We store only the result (the foods, portions and nutrition estimates) so you can see your scan history. Temporary copies on your phone are deleted after use.
- **Progress photos:** if you add progress photos, they are stored in a **private** storage area that only your account can access. They are never public.
- **Saving images:** if you choose to save an image (for example a share card) to your Photos, CalDefiq asks for permission to *add* to your library. It does not read your library for this.

### 2.8 AI scan records
For each AI scan we keep: the date and time, status, the AI's result, the result you confirmed, and technical cost data (number of AI "tokens" used and the estimated cost). If you delete a scan from your history, we erase its content and hide it, but keep a bare record (time, status, tokens, cost) so daily limits and spending caps cannot be reset. That bare record is deleted when you delete your account.

### 2.9 Nutrition Assistant messages
If you use the Nutrition Assistant, we store your messages and its replies so you can see the conversation. To keep people safe, messages about topics such as medical conditions, eating disorders or self-harm are labelled so the assistant can respond carefully. You can clear your history in the app; cleared messages are emptied and hidden, and fully deleted when you delete your account.
**Using your records (optional, off by default).** The assistant can only read your CalDefiq records if you switch on **Use my CalDefiq records** in the assistant. It then reads your meals, water, daily step totals (which can include steps from Apple Health, if you connected it), workouts, walks, weigh-ins and goals from the last 7 days, read-only. You can switch it off at any time. The same applies to the optional weekly progress report.

**AI answers.** When AI answers are on, your message and, only if you switched on records, that 7-day summary are sent to **OpenAI** to write the reply. We send no name, email or account ID. The assistant can suggest adding water or a food, but nothing is added unless you tap to confirm.

### 2.10 Food budget and shopping
If you use the Budget Planner, we store your budget, food spending you enter (amount, currency, category, note), ingredient prices, pantry items and shopping list.

### 2.11 Food search and barcodes
When you search for a food or scan a barcode, the search words or barcode number go to our server, which looks them up in **USDA FoodData Central** (US government) and **Open Food Facts**. We do **not** send your name, email or account ID to them. We count how many lookups you make per day (for daily limits) but we do not keep a history of your searches.

### 2.12 Subscription and usage records
- How many AI scans, barcode lookups and assistant messages you used each day (to apply the free and Premium daily limits).
- If you subscribe to Premium: your plan (monthly or yearly), status, renewal and expiry dates, the App Store product and the App Store transaction ID. **Payment is handled entirely by Apple.** We never see or store your card or bank details.

### 2.13 Reminders
Reminders are **local notifications** scheduled on your phone. They are off by default. We store only your reminder settings (which reminders, what time, quiet hours). We do not use push-notification tokens and do not send marketing notifications.

### 2.14 What we do NOT collect
- No advertising IDs (IDFA), no ad networks, no ad tracking, no data brokers.
- No analytics or tracking SDKs.
- No contacts, microphone recordings, browsing history or messages from other apps.
- No payment card details.
- No crash-reporting service at the moment. *(Owner: if you add one, such as Sentry, update this section. See `CRASH_REPORTING_PLAN.md`.)*

---

## 3. Apple Health

*Owner: built in the code (read-only), but it only works in CalDefiq's own iOS build and needs migration 0011. Publish this section with the first release that includes it.*

If you choose to connect Apple Health, CalDefiq will **read** (never write) these data types: **steps, walking + running distance, workouts and active energy**. Connecting is **optional**; the app works without it, and you can turn access off at any time in the iPhone **Settings → Health → Data Access & Devices → CalDefiq**.

As Apple requires, data from Apple Health:
- is used **only** to show your activity and calorie information inside CalDefiq;
- is **never** used for advertising or marketing;
- is **never** sold, and never shared with advertisers, data brokers or information resellers;
- is never used for anything other than your health and fitness inside the app.

**What is saved to your account.** So your history is the same on every device, CalDefiq saves:
- one **step total per day**: the higher of your iPhone's count and Apple Health's total, never the two added together;
- a summary of each **imported workout**: type, start and end time, duration, distance, active calories, and the name of the app or device that recorded it (for example "Apple Watch").

A workout that is the same activity as one already in CalDefiq (or recorded twice in Apple Health) is kept but not counted twice. If you delete a workout in Apple Health, CalDefiq stops counting it. You can disconnect Apple Health and delete everything CalDefiq imported from it at any time (Settings → Apple Health). Disconnecting doesn't change anything in Apple Health itself.

If you switch on **Use my CalDefiq records** for the assistant, your daily step totals (which may include Apple Health steps) are part of what it reads (section 2.9). Imported workouts are not sent to the assistant.

[[OWNER: confirm you are happy that Health step totals and workout summaries are saved to your Supabase account (this is how the code works today). If you want Health data to stay only on the phone, tell Claude before the first build.]]

## 4. Home Screen widgets

*Owner: built in the code, but it only works in CalDefiq's own iOS build. Publish this section with the first release that includes it.*

CalDefiq widgets show a summary (calories left, protein, carbs, fat, steps and water for today) on your Home Screen. To do this, the app shares a small summary with the widget **on your phone only** (through an iOS "App Group"). Anyone who can see your screen may see what the widget shows. When you log out, the widget stops showing your numbers and asks you to log in.

---

## 5. Who processes your data for us

We use these service providers ("processors") to run CalDefiq. They may only use your data to provide their service to us.

| Provider | What they do | What they receive |
|---|---|---|
| **Supabase** | Hosts our database, sign-in, private photo storage and server functions. | All account data described above. According to the project's configuration, the database is in the AWS region **ap-northeast-2 (Seoul, South Korea)**. |
| **OpenAI** | Analyses meal photos when you use AI scanning; writes assistant replies and weekly reports when AI answers are on. | The photo (and, for Before & After, the names of the foods from your earlier scan); for the assistant, your message and, only if you switched on records, a 7-day summary of your records (section 2.9). Not your name or email. We ask OpenAI not to store the request (`store: false`). Under OpenAI's API terms it may still keep API data for a limited time (currently stated as up to 30 days) to detect abuse. [[OWNER: confirm against OpenAI's current API data-usage policy and any data-processing agreement you sign]] |
| **USDA FoodData Central** | Food nutrition database. | Search words and food names only, sent from our server. |
| **Open Food Facts** | Packaged-product database. | Barcode numbers only, sent from our server. |
| **Apple** | Sign in with Apple, App Store payments, maps shown during walks, and turning a location into a country code on your phone. | What you share with Apple under Apple's own privacy policy. |
| **Google** | Only if you choose "Continue with Google". | What you share with Google under Google's own privacy policy. |
| **Email delivery** | Sends sign-in and password-reset codes. | Your email address. [[OWNER: name your email provider, e.g. Supabase's built-in email or the custom SMTP service you set up]] |

We do not sell, rent or trade your personal data.

## 6. International transfers
Our servers and providers may be in countries other than yours (for example South Korea and the United States). [[OWNER: with your lawyer, describe the safeguards you rely on, e.g. Standard Contractual Clauses, if you serve users in the EU/UK.]]

## 7. Legal bases (EU/UK users)
[[OWNER: confirm with your lawyer.]] Suggested: we process your account and logs **to provide the service you asked for (contract)**; we process **health data with your explicit consent**, which you give when you enter it, and which you can withdraw by deleting the data or your account; we keep limited records (for example scan counters) for our **legitimate interest** in preventing abuse and controlling costs.

## 8. How long we keep data
- **While your account exists:** we keep your data so the app works.
- **When you delete something:** most items (meals, walks, photos, etc.) are deleted straight away. Deleted AI scans and cleared assistant messages are emptied and hidden, with a bare record kept until you delete your account (see 2.8 and 2.9).
- **When you delete your account:** your account and all data linked to it are deleted from our live database and your progress photos are deleted from storage.
- **Backups:** copies may remain in our hosting provider's backups for up to [[OWNER: backup retention, e.g. 7 days on the Supabase Pro plan]] before they are overwritten.
- **Server logs:** technical logs kept by our hosting provider for up to [[OWNER: log retention for your Supabase plan]].

## 9. Your rights and choices
- **See and export your data:** Settings (gear icon on the Home tab) → Data & Privacy → **Export my data** (a copy in JSON format).
- **Correct your data:** edit it in the app.
- **Delete your data:** delete single entries in the app, or delete everything with Settings (gear icon on the Home tab) → Data & Privacy → **Delete account**. See `ACCOUNT_DELETION.md`.
- **Permissions:** you can turn camera, photos, location, motion and notifications on or off at any time in the iPhone Settings app.
- **Contact us** at [[OWNER: support / privacy email]] for any other request. Depending on where you live (for example the EU, UK or California), you may have more rights, including the right to complain to your local data-protection authority.

## 10. Children
CalDefiq is not for children. You must be at least **[[OWNER: minimum age; the app currently accepts age 13 and up, consider 16 for the EU]]** years old to use it. The app does not allow a calorie deficit for users under 18. If you believe a child has given us data, contact us and we will delete it.

## 11. Security
Your data is protected by database rules that let only your signed-in account read or change your rows. Connections are encrypted (HTTPS). Progress photos are in a private storage area and are shown only through short-lived links. Secret keys stay on our server and are never inside the app. No system is perfectly secure, but we work to protect your data.

## 12. Health disclaimer
CalDefiq gives estimates, not medical advice. AI and database values can be wrong. Talk to a doctor before making big changes to your diet or exercise, especially if you are pregnant, have a medical condition or have a history of eating disorders.

## 13. Changes to this policy
If we change this policy, we will update the date at the top and, for important changes, tell you in the app.

## 14. Contact
[[OWNER: legal entity name]]
[[OWNER: postal address]]
[[OWNER: support / privacy email]]
