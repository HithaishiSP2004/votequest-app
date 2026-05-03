Google Cloud Build / rmgpgab-votequest-app-asia-south1-HithaishiSP2004-votequest-ocu (votequest-app)
failed 10 minutes ago in 1m 44s
Summary
Build Information

Trigger	rmgpgab-votequest-app-asia-south1-HithaishiSP2004-votequest-ocu
Build	5085f5f5-f2d3-40b9-b3e4-4fad7a5cc46e
Start	2026-05-03T07:44:37-07:00
Duration	1m43.04s
Status	FAILURE

Steps

Step	Status	Duration
Build	FAILURE	1m28.241s
Push	QUEUED	0s
Deploy	QUEUED	0s
Details

starting build "5085f5f5-f2d3-40b9-b3e4-4fad7a5cc46e"

FETCHSOURCE
From https://github.com/HithaishiSP2004/votequest-app
 * branch            d80ca60ccaaa650840dfa1617b965cc590debe5f -> FETCH_HEAD
HEAD is now at d80ca60 Fix SpeechRecognition type conflict in ChatPanel
GitCommit:
d80ca60ccaaa650840dfa1617b965cc590debe5f
BUILD
Starting Step #0 - "Build"
Step #0 - "Build": Already have image (with digest): gcr.io/cloud-builders/docker
Step #0 - "Build": Sending build context to Docker daemon  1.023MB

Step #0 - "Build": Step 1/24 : FROM node:20-alpine AS base
Step #0 - "Build": 20-alpine: Pulling from library/node
Step #0 - "Build": 6a0ac1617861: Already exists
Step #0 - "Build": 4feea04c1543: Pulling fs layer
Step #0 - "Build": b2cbbfe903b0: Pulling fs layer
Step #0 - "Build": fff4e2c1b189: Pulling fs layer
Step #0 - "Build": fff4e2c1b189: Verifying Checksum
Step #0 - "Build": fff4e2c1b189: Download complete
Step #0 - "Build": b2cbbfe903b0: Verifying Checksum
Step #0 - "Build": b2cbbfe903b0: Download complete
Step #0 - "Build": 4feea04c1543: Verifying Checksum
Step #0 - "Build": 4feea04c1543: Download complete
Step #0 - "Build": 4feea04c1543: Pull complete
Step #0 - "Build": b2cbbfe903b0: Pull complete
Step #0 - "Build": fff4e2c1b189: Pull complete
Step #0 - "Build": Digest: sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293
Step #0 - "Build": Status: Downloaded newer image for node:20-alpine
Step #0 - "Build":  ---> 11cedc39e663
Step #0 - "Build": Step 2/24 : FROM base AS deps
Step #0 - "Build":  ---> 11cedc39e663
Step #0 - "Build": Step 3/24 : RUN apk add --no-cache libc6-compat
Step #0 - "Build":  ---> Running in aa5668f6c576
Step #0 - "Build": (1/3) Installing musl-obstack (1.2.3-r2)
Step #0 - "Build": (2/3) Installing libucontext (1.3.3-r0)
Step #0 - "Build": (3/3) Installing gcompat (1.1.0-r4)
Step #0 - "Build": OK: 11.0 MiB in 21 packages
Step #0 - "Build": Removing intermediate container aa5668f6c576
Step #0 - "Build":  ---> 9e05e962a41d
Step #0 - "Build": Step 4/24 : WORKDIR /app
Step #0 - "Build":  ---> Running in aa744398e0f0
Step #0 - "Build": Removing intermediate container aa744398e0f0
Step #0 - "Build":  ---> a9de4c0304df
Step #0 - "Build": Step 5/24 : COPY package.json package-lock.json* ./
Step #0 - "Build":  ---> 1240ebb98ea2
Step #0 - "Build": Step 6/24 : RUN npm ci
Step #0 - "Build":  ---> Running in 476ec8e47829
Step #0 - "Build":  [91mnpm warn deprecated whatwg-encoding@2.0.0: Use @exodus/bytes instead for a more spec-conformant and faster implementation
Step #0 - "Build":  [0m [91mnpm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
Step #0 - "Build":  [0m [91mnpm warn deprecated glob@7.2.3: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
Step #0 - "Build":  [0m [91mnpm warn deprecated domexception@4.0.0: Use your platform's native DOMException instead
Step #0 - "Build":  [0m [91mnpm warn deprecated abab@2.0.6: Use your platform's native atob() and btoa() methods instead
Step #0 - "Build":  [0m
Step #0 - "Build": added 626 packages, and audited 627 packages in 18s
Step #0 - "Build": 
Step #0 - "Build": 169 packages are looking for funding
Step #0 - "Build":   run `npm fund` for details
Step #0 - "Build": 
Step #0 - "Build": 6 vulnerabilities (4 low, 2 moderate)
Step #0 - "Build": 
Step #0 - "Build": To address all issues (including breaking changes), run:
Step #0 - "Build":   npm audit fix --force
Step #0 - "Build": 
Step #0 - "Build": Run `npm audit` for details.
Step #0 - "Build":  [91mnpm notice
Step #0 - "Build": npm notice New major version of npm available! 10.8.2 -> 11.13.0
Step #0 - "Build": npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.13.0
Step #0 - "Build": npm notice To update run: npm install -g npm@11.13.0
Step #0 - "Build": npm notice
Step #0 - "Build":  [0mRemoving intermediate container 476ec8e47829
Step #0 - "Build":  ---> 822f47651d33
Step #0 - "Build": Step 7/24 : FROM base AS builder
Step #0 - "Build":  ---> 11cedc39e663
Step #0 - "Build": Step 8/24 : WORKDIR /app
Step #0 - "Build":  ---> Running in 39a89e89bb97
Step #0 - "Build": Removing intermediate container 39a89e89bb97
Step #0 - "Build":  ---> 5094fb36903a
Step #0 - "Build": Step 9/24 : COPY --from=deps /app/node_modules ./node_modules
Step #0 - "Build":  ---> 55788afd8b67
Step #0 - "Build": Step 10/24 : COPY . .
Step #0 - "Build":  ---> 029db242d923
Step #0 - "Build": Step 11/24 : RUN npm run build
Step #0 - "Build":  ---> Running in 4afd6ab7f8e5
Step #0 - "Build": 
Step #0 - "Build": > votequest-app@0.1.0 build
Step #0 - "Build": > next build
Step #0 - "Build": 
Step #0 - "Build": Attention: Next.js now collects completely anonymous telemetry regarding usage.
Step #0 - "Build": This information is used to shape Next.js' roadmap and prioritize features.
Step #0 - "Build": You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
Step #0 - "Build": https://nextjs.org/telemetry
Step #0 - "Build": 
Step #0 - "Build": ▲ Next.js 16.2.4 (Turbopack)
Step #0 - "Build": 
Step #0 - "Build":   Creating an optimized production build ...
Step #0 - "Build": ✓ Compiled successfully in 6.5s
Step #0 - "Build":   Running TypeScript ...
Step #0 - "Build":  [91mFailed to type check.
Step #0 - "Build": 
Step #0 - "Build":  [0m [91m./src/app/page.tsx:140:50
Step #0 - "Build": Type error: Type '(tab: Tab, msg?: string) => void' is not assignable to type '(tab: string, msg?: string | undefined) => void'.
Step #0 - "Build":   Types of parameters 'tab' and 'tab' are incompatible.
Step #0 - "Build":     Type 'string' is not assignable to type 'Tab'.
Step #0 - "Build": 
Step #0 - "Build":    [90m138 | [0m ...{ [90m/* PANELS */ [0m}
Step #0 - "Build":    [90m139 | [0m ...<main style={{ flex:  [35m1 [0m }}>
Step #0 - "Build":  [31m [1m> [0m  [90m140 | [0m ...  {activeTab ===  [32m'home' [0m      && < [33mHomePanel [0m onNavigate={navigate} xp={xp} quizScore={qu...
Step #0 - "Build":    [90m    | [0m                                                [31m [1m^ [0m
Step #0 - "Build":    [90m141 | [0m ...  {activeTab ===  [32m'chat' [0m      && < [33mChatPanel [0m initialMsg={chatInitialMsg} onClearInitial=...
Step #0 - "Build":    [90m142 | [0m ...  {activeTab ===  [32m'journey' [0m   && < [33mJourneyPanel [0m onXP={addXP} />}
Step #0 - "Build":    [90m143 | [0m ...  {activeTab ===  [32m'quiz' [0m      && < [33mQuizPanel [0m onXP={addXP} />}
Step #0 - "Build":  [0m [91mNext.js build worker exited with code: 1 and signal: null
Step #0 - "Build":  [0m [91mnpm notice
Step #0 - "Build": npm notice New major version of npm available! 10.8.2 -> 11.13.0
Step #0 - "Build": npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.13.0
Step #0 - "Build": npm notice To update run: npm install -g npm@11.13.0
Step #0 - "Build": npm notice
Step #0 - "Build": The command '/bin/sh -c npm run build' returned a non-zero code: 1
Finished Step #0 - "Build"
ERROR
ERROR: build step 0 "gcr.io/cloud-builders/docker" failed: step exited with non-zero status: 1
Step #0 - "Build":  [0m

starting build "5085f5f5-f2d3-40b9-b3e4-4fad7a5cc46e"

FETCHSOURCE
From https://github.com/HithaishiSP2004/votequest-app
 * branch            d80ca60ccaaa650840dfa1617b965cc590debe5f -> FETCH_HEAD
HEAD is now at d80ca60 Fix SpeechRecognition type conflict in ChatPanel
GitCommit:
d80ca60ccaaa650840dfa1617b965cc590debe5f
BUILD
Starting Step #0 - "Build"
Step #0 - "Build": Already have image (with digest): gcr.io/cloud-builders/docker
Step #0 - "Build": Sending build context to Docker daemon  1.023MB

Step #0 - "Build": Step 1/24 : FROM node:20-alpine AS base
Step #0 - "Build": 20-alpine: Pulling from library/node
Step #0 - "Build": 6a0ac1617861: Already exists
Step #0 - "Build": 4feea04c1543: Pulling fs layer
Step #0 - "Build": b2cbbfe903b0: Pulling fs layer
Step #0 - "Build": fff4e2c1b189: Pulling fs layer
Step #0 - "Build": fff4e2c1b189: Verifying Checksum
Step #0 - "Build": fff4e2c1b189: Download complete
Step #0 - "Build": b2cbbfe903b0: Verifying Checksum
Step #0 - "Build": b2cbbfe903b0: Download complete
Step #0 - "Build": 4feea04c1543: Verifying Checksum
Step #0 - "Build": 4feea04c1543: Download complete
Step #0 - "Build": 4feea04c1543: Pull complete
Step #0 - "Build": b2cbbfe903b0: Pull complete
Step #0 - "Build": fff4e2c1b189: Pull complete
Step #0 - "Build": Digest: sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293
Step #0 - "Build": Status: Downloaded newer image for node:20-alpine
Step #0 - "Build":  ---> 11cedc39e663
Step #0 - "Build": Step 2/24 : FROM base AS deps
Step #0 - "Build":  ---> 11cedc39e663
Step #0 - "Build": Step 3/24 : RUN apk add --no-cache libc6-compat
Step #0 - "Build":  ---> Running in aa5668f6c576
Step #0 - "Build": (1/3) Installing musl-obstack (1.2.3-r2)
Step #0 - "Build": (2/3) Installing libucontext (1.3.3-r0)
Step #0 - "Build": (3/3) Installing gcompat (1.1.0-r4)
Step #0 - "Build": OK: 11.0 MiB in 21 packages
Step #0 - "Build": Removing intermediate container aa5668f6c576
Step #0 - "Build":  ---> 9e05e962a41d
Step #0 - "Build": Step 4/24 : WORKDIR /app
Step #0 - "Build":  ---> Running in aa744398e0f0
Step #0 - "Build": Removing intermediate container aa744398e0f0
Step #0 - "Build":  ---> a9de4c0304df
Step #0 - "Build": Step 5/24 : COPY package.json package-lock.json* ./
Step #0 - "Build":  ---> 1240ebb98ea2
Step #0 - "Build": Step 6/24 : RUN npm ci
Step #0 - "Build":  ---> Running in 476ec8e47829
Step #0 - "Build":  [91mnpm warn deprecated whatwg-encoding@2.0.0: Use @exodus/bytes instead for a more spec-conformant and faster implementation
Step #0 - "Build":  [0m [91mnpm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
Step #0 - "Build":  [0m [91mnpm warn deprecated glob@7.2.3: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
Step #0 - "Build":  [0m [91mnpm warn deprecated domexception@4.0.0: Use your platform's native DOMException instead
Step #0 - "Build":  [0m [91mnpm warn deprecated abab@2.0.6: Use your platform's native atob() and btoa() methods instead
Step #0 - "Build":  [0m
Step #0 - "Build": added 626 packages, and audited 627 packages in 18s
Step #0 - "Build": 
Step #0 - "Build": 169 packages are looking for funding
Step #0 - "Build":   run `npm fund` for details
Step #0 - "Build": 
Step #0 - "Build": 6 vulnerabilities (4 low, 2 moderate)
Step #0 - "Build": 
Step #0 - "Build": To address all issues (including breaking changes), run:
Step #0 - "Build":   npm audit fix --force
Step #0 - "Build": 
Step #0 - "Build": Run `npm audit` for details.
Step #0 - "Build":  [91mnpm notice
Step #0 - "Build": npm notice New major version of npm available! 10.8.2 -> 11.13.0
Step #0 - "Build": npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.13.0
Step #0 - "Build": npm notice To update run: npm install -g npm@11.13.0
Step #0 - "Build": npm notice
Step #0 - "Build":  [0mRemoving intermediate container 476ec8e47829
Step #0 - "Build":  ---> 822f47651d33
Step #0 - "Build": Step 7/24 : FROM base AS builder
Step #0 - "Build":  ---> 11cedc39e663
Step #0 - "Build": Step 8/24 : WORKDIR /app
Step #0 - "Build":  ---> Running in 39a89e89bb97
Step #0 - "Build": Removing intermediate container 39a89e89bb97
Step #0 - "Build":  ---> 5094fb36903a
Step #0 - "Build": Step 9/24 : COPY --from=deps /app/node_modules ./node_modules
Step #0 - "Build":  ---> 55788afd8b67
Step #0 - "Build": Step 10/24 : COPY . .
Step #0 - "Build":  ---> 029db242d923
Step #0 - "Build": Step 11/24 : RUN npm run build
Step #0 - "Build":  ---> Running in 4afd6ab7f8e5
Step #0 - "Build": 
Step #0 - "Build": > votequest-app@0.1.0 build
Step #0 - "Build": > next build
Step #0 - "Build": 
Step #0 - "Build": Attention: Next.js now collects completely anonymous telemetry regarding usage.
Step #0 - "Build": This information is used to shape Next.js' roadmap and prioritize features.
Step #0 - "Build": You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
Step #0 - "Build": https://nextjs.org/telemetry
Step #0 - "Build": 
Step #0 - "Build": ▲ Next.js 16.2.4 (Turbopack)
Step #0 - "Build": 
Step #0 - "Build":   Creating an optimized production build ...
Step #0 - "Build": ✓ Compiled successfully in 6.5s
Step #0 - "Build":   Running TypeScript ...
Step #0 - "Build":  [91mFailed to type check.
Step #0 - "Build": 
Step #0 - "Build":  [0m [91m./src/app/page.tsx:140:50
Step #0 - "Build": Type error: Type '(tab: Tab, msg?: string) => void' is not assignable to type '(tab: string, msg?: string | undefined) => void'.
Step #0 - "Build":   Types of parameters 'tab' and 'tab' are incompatible.
Step #0 - "Build":     Type 'string' is not assignable to type 'Tab'.
Step #0 - "Build": 
Step #0 - "Build":    [90m138 | [0m ...{ [90m/* PANELS */ [0m}
Step #0 - "Build":    [90m139 | [0m ...<main style={{ flex:  [35m1 [0m }}>
Step #0 - "Build":  [31m [1m> [0m  [90m140 | [0m ...  {activeTab ===  [32m'home' [0m      && < [33mHomePanel [0m onNavigate={navigate} xp={xp} quizScore={qu...
Step #0 - "Build":    [90m    | [0m                                                [31m [1m^ [0m
Step #0 - "Build":    [90m141 | [0m ...  {activeTab ===  [32m'chat' [0m      && < [33mChatPanel [0m initialMsg={chatInitialMsg} onClearInitial=...
Step #0 - "Build":    [90m142 | [0m ...  {activeTab ===  [32m'journey' [0m   && < [33mJourneyPanel [0m onXP={addXP} />}
Step #0 - "Build":    [90m143 | [0m ...  {activeTab ===  [32m'quiz' [0m      && < [33mQuizPanel [0m onXP={addXP} />}
Step #0 - "Build":  [0m [91mNext.js build worker exited with code: 1 and signal: null
Step #0 - "Build":  [0m [91mnpm notice
Step #0 - "Build": npm notice New major version of npm available! 10.8.2 -> 11.13.0
Step #0 - "Build": npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.13.0
Step #0 - "Build": npm notice To update run: npm install -g npm@11.13.0
Step #0 - "Build": npm notice
Step #0 - "Build": The command '/bin/sh -c npm run build' returned a non-zero code: 1
Finished Step #0 - "Build"
ERROR
ERROR: build step 0 "gcr.io/cloud-builders/docker" failed: step exited with non-zero status: 1
Step #0 - "Build":  [0m

starting build "5085f5f5-f2d3-40b9-b3e4-4fad7a5cc46e"

FETCHSOURCE
From https://github.com/HithaishiSP2004/votequest-app
 * branch            d80ca60ccaaa650840dfa1617b965cc590debe5f -> FETCH_HEAD
HEAD is now at d80ca60 Fix SpeechRecognition type conflict in ChatPanel
GitCommit:
d80ca60ccaaa650840dfa1617b965cc590debe5f
BUILD
Starting Step #0 - "Build"
Step #0 - "Build": Already have image (with digest): gcr.io/cloud-builders/docker
Step #0 - "Build": Sending build context to Docker daemon  1.023MB

Step #0 - "Build": Step 1/24 : FROM node:20-alpine AS base
Step #0 - "Build": 20-alpine: Pulling from library/node
Step #0 - "Build": 6a0ac1617861: Already exists
Step #0 - "Build": 4feea04c1543: Pulling fs layer
Step #0 - "Build": b2cbbfe903b0: Pulling fs layer
Step #0 - "Build": fff4e2c1b189: Pulling fs layer
Step #0 - "Build": fff4e2c1b189: Verifying Checksum
Step #0 - "Build": fff4e2c1b189: Download complete
Step #0 - "Build": b2cbbfe903b0: Verifying Checksum
Step #0 - "Build": b2cbbfe903b0: Download complete
Step #0 - "Build": 4feea04c1543: Verifying Checksum
Step #0 - "Build": 4feea04c1543: Download complete
Step #0 - "Build": 4feea04c1543: Pull complete
Step #0 - "Build": b2cbbfe903b0: Pull complete
Step #0 - "Build": fff4e2c1b189: Pull complete
Step #0 - "Build": Digest: sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293
Step #0 - "Build": Status: Downloaded newer image for node:20-alpine
Step #0 - "Build":  ---> 11cedc39e663
Step #0 - "Build": Step 2/24 : FROM base AS deps
Step #0 - "Build":  ---> 11cedc39e663
Step #0 - "Build": Step 3/24 : RUN apk add --no-cache libc6-compat
Step #0 - "Build":  ---> Running in aa5668f6c576
Step #0 - "Build": (1/3) Installing musl-obstack (1.2.3-r2)
Step #0 - "Build": (2/3) Installing libucontext (1.3.3-r0)
Step #0 - "Build": (3/3) Installing gcompat (1.1.0-r4)
Step #0 - "Build": OK: 11.0 MiB in 21 packages
Step #0 - "Build": Removing intermediate container aa5668f6c576
Step #0 - "Build":  ---> 9e05e962a41d
Step #0 - "Build": Step 4/24 : WORKDIR /app
Step #0 - "Build":  ---> Running in aa744398e0f0
Step #0 - "Build": Removing intermediate container aa744398e0f0
Step #0 - "Build":  ---> a9de4c0304df
Step #0 - "Build": Step 5/24 : COPY package.json package-lock.json* ./
Step #0 - "Build":  ---> 1240ebb98ea2
Step #0 - "Build": Step 6/24 : RUN npm ci
Step #0 - "Build":  ---> Running in 476ec8e47829
Step #0 - "Build":  [91mnpm warn deprecated whatwg-encoding@2.0.0: Use @exodus/bytes instead for a more spec-conformant and faster implementation
Step #0 - "Build":  [0m [91mnpm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
Step #0 - "Build":  [0m [91mnpm warn deprecated glob@7.2.3: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
Step #0 - "Build":  [0m [91mnpm warn deprecated domexception@4.0.0: Use your platform's native DOMException instead
Step #0 - "Build":  [0m [91mnpm warn deprecated abab@2.0.6: Use your platform's native atob() and btoa() methods instead
Step #0 - "Build":  [0m
Step #0 - "Build": added 626 packages, and audited 627 packages in 18s
Step #0 - "Build": 
Step #0 - "Build": 169 packages are looking for funding
Step #0 - "Build":   run `npm fund` for details
Step #0 - "Build": 
Step #0 - "Build": 6 vulnerabilities (4 low, 2 moderate)
Step #0 - "Build": 
Step #0 - "Build": To address all issues (including breaking changes), run:
Step #0 - "Build":   npm audit fix --force
Step #0 - "Build": 
Step #0 - "Build": Run `npm audit` for details.
Step #0 - "Build":  [91mnpm notice
Step #0 - "Build": npm notice New major version of npm available! 10.8.2 -> 11.13.0
Step #0 - "Build": npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.13.0
Step #0 - "Build": npm notice To update run: npm install -g npm@11.13.0
Step #0 - "Build": npm notice
Step #0 - "Build":  [0mRemoving intermediate container 476ec8e47829
Step #0 - "Build":  ---> 822f47651d33
Step #0 - "Build": Step 7/24 : FROM base AS builder
Step #0 - "Build":  ---> 11cedc39e663
Step #0 - "Build": Step 8/24 : WORKDIR /app
Step #0 - "Build":  ---> Running in 39a89e89bb97
Step #0 - "Build": Removing intermediate container 39a89e89bb97
Step #0 - "Build":  ---> 5094fb36903a
Step #0 - "Build": Step 9/24 : COPY --from=deps /app/node_modules ./node_modules
Step #0 - "Build":  ---> 55788afd8b67
Step #0 - "Build": Step 10/24 : COPY . .
Step #0 - "Build":  ---> 029db242d923
Step #0 - "Build": Step 11/24 : RUN npm run build
Step #0 - "Build":  ---> Running in 4afd6ab7f8e5
Step #0 - "Build": 
Step #0 - "Build": > votequest-app@0.1.0 build
Step #0 - "Build": > next build
Step #0 - "Build": 
Step #0 - "Build": Attention: Next.js now collects completely anonymous telemetry regarding usage.
Step #0 - "Build": This information is used to shape Next.js' roadmap and prioritize features.
Step #0 - "Build": You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
Step #0 - "Build": https://nextjs.org/telemetry
Step #0 - "Build": 
Step #0 - "Build": ▲ Next.js 16.2.4 (Turbopack)
Step #0 - "Build": 
Step #0 - "Build":   Creating an optimized production build ...
Step #0 - "Build": ✓ Compiled successfully in 6.5s
Step #0 - "Build":   Running TypeScript ...
Step #0 - "Build":  [91mFailed to type check.
Step #0 - "Build": 
Step #0 - "Build":  [0m [91m./src/app/page.tsx:140:50
Step #0 - "Build": Type error: Type '(tab: Tab, msg?: string) => void' is not assignable to type '(tab: string, msg?: string | undefined) => void'.
Step #0 - "Build":   Types of parameters 'tab' and 'tab' are incompatible.
Step #0 - "Build":     Type 'string' is not assignable to type 'Tab'.
Step #0 - "Build": 
Step #0 - "Build":    [90m138 | [0m ...{ [90m/* PANELS */ [0m}
Step #0 - "Build":    [90m139 | [0m ...<main style={{ flex:  [35m1 [0m }}>
Step #0 - "Build":  [31m [1m> [0m  [90m140 | [0m ...  {activeTab ===  [32m'home' [0m      && < [33mHomePanel [0m onNavigate={navigate} xp={xp} quizScore={qu...
Step #0 - "Build":    [90m    | [0m                                                [31m [1m^ [0m
Step #0 - "Build":    [90m141 | [0m ...  {activeTab ===  [32m'chat' [0m      && < [33mChatPanel [0m initialMsg={chatInitialMsg} onClearInitial=...
Step #0 - "Build":    [90m142 | [0m ...  {activeTab ===  [32m'journey' [0m   && < [33mJourneyPanel [0m onXP={addXP} />}
Step #0 - "Build":    [90m143 | [0m ...  {activeTab ===  [32m'quiz' [0m      && < [33mQuizPanel [0m onXP={addXP} />}
Step #0 - "Build":  [0m [91mNext.js build worker exited with code: 1 and signal: null
Step #0 - "Build":  [0m [91mnpm notice
Step #0 - "Build": npm notice New major version of npm available! 10.8.2 -> 11.13.0
Step #0 - "Build": npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.13.0
Step #0 - "Build": npm notice To update run: npm install -g npm@11.13.0
Step #0 - "Build": npm notice
Step #0 - "Build": The command '/bin/sh -c npm run build' returned a non-zero code: 1
Finished Step #0 - "Build"
ERROR
ERROR: build step 0 "gcr.io/cloud-builders/docker" failed: step exited with non-zero status: 1
Step #0 - "Build":  [0m

starting build "5085f5f5-f2d3-40b9-b3e4-4fad7a5cc46e"

FETCHSOURCE
From https://github.com/HithaishiSP2004/votequest-app
 * branch            d80ca60ccaaa650840dfa1617b965cc590debe5f -> FETCH_HEAD
HEAD is now at d80ca60 Fix SpeechRecognition type conflict in ChatPanel
GitCommit:
d80ca60ccaaa650840dfa1617b965cc590debe5f
BUILD
Starting Step #0 - "Build"
Step #0 - "Build": Already have image (with digest): gcr.io/cloud-builders/docker
Step #0 - "Build": Sending build context to Docker daemon  1.023MB

Step #0 - "Build": Step 1/24 : FROM node:20-alpine AS base
Step #0 - "Build": 20-alpine: Pulling from library/node
Step #0 - "Build": 6a0ac1617861: Already exists
Step #0 - "Build": 4feea04c1543: Pulling fs layer
Step #0 - "Build": b2cbbfe903b0: Pulling fs layer
Step #0 - "Build": fff4e2c1b189: Pulling fs layer
Step #0 - "Build": fff4e2c1b189: Verifying Checksum
Step #0 - "Build": fff4e2c1b189: Download complete
Step #0 - "Build": b2cbbfe903b0: Verifying Checksum
Step #0 - "Build": b2cbbfe903b0: Download complete
Step #0 - "Build": 4feea04c1543: Verifying Checksum
Step #0 - "Build": 4feea04c1543: Download complete
Step #0 - "Build": 4feea04c1543: Pull complete
Step #0 - "Build": b2cbbfe903b0: Pull complete
Step #0 - "Build": fff4e2c1b189: Pull complete
Step #0 - "Build": Digest: sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293
Step #0 - "Build": Status: Downloaded newer image for node:20-alpine
Step #0 - "Build":  ---> 11cedc39e663
Step #0 - "Build": Step 2/24 : FROM base AS deps
Step #0 - "Build":  ---> 11cedc39e663
Step #0 - "Build": Step 3/24 : RUN apk add --no-cache libc6-compat
Step #0 - "Build":  ---> Running in aa5668f6c576
Step #0 - "Build": (1/3) Installing musl-obstack (1.2.3-r2)
Step #0 - "Build": (2/3) Installing libucontext (1.3.3-r0)
Step #0 - "Build": (3/3) Installing gcompat (1.1.0-r4)
Step #0 - "Build": OK: 11.0 MiB in 21 packages
Step #0 - "Build": Removing intermediate container aa5668f6c576
Step #0 - "Build":  ---> 9e05e962a41d
Step #0 - "Build": Step 4/24 : WORKDIR /app
Step #0 - "Build":  ---> Running in aa744398e0f0
Step #0 - "Build": Removing intermediate container aa744398e0f0
Step #0 - "Build":  ---> a9de4c0304df
Step #0 - "Build": Step 5/24 : COPY package.json package-lock.json* ./
Step #0 - "Build":  ---> 1240ebb98ea2
Step #0 - "Build": Step 6/24 : RUN npm ci
Step #0 - "Build":  ---> Running in 476ec8e47829
Step #0 - "Build":  [91mnpm warn deprecated whatwg-encoding@2.0.0: Use @exodus/bytes instead for a more spec-conformant and faster implementation
Step #0 - "Build":  [0m [91mnpm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
Step #0 - "Build":  [0m [91mnpm warn deprecated glob@7.2.3: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
Step #0 - "Build":  [0m [91mnpm warn deprecated domexception@4.0.0: Use your platform's native DOMException instead
Step #0 - "Build":  [0m [91mnpm warn deprecated abab@2.0.6: Use your platform's native atob() and btoa() methods instead
Step #0 - "Build":  [0m
Step #0 - "Build": added 626 packages, and audited 627 packages in 18s
Step #0 - "Build": 
Step #0 - "Build": 169 packages are looking for funding
Step #0 - "Build":   run `npm fund` for details
Step #0 - "Build": 
Step #0 - "Build": 6 vulnerabilities (4 low, 2 moderate)
Step #0 - "Build": 
Step #0 - "Build": To address all issues (including breaking changes), run:
Step #0 - "Build":   npm audit fix --force
Step #0 - "Build": 
Step #0 - "Build": Run `npm audit` for details.
Step #0 - "Build":  [91mnpm notice
Step #0 - "Build": npm notice New major version of npm available! 10.8.2 -> 11.13.0
Step #0 - "Build": npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.13.0
Step #0 - "Build": npm notice To update run: npm install -g npm@11.13.0
Step #0 - "Build": npm notice
Step #0 - "Build":  [0mRemoving intermediate container 476ec8e47829
Step #0 - "Build":  ---> 822f47651d33
Step #0 - "Build": Step 7/24 : FROM base AS builder
Step #0 - "Build":  ---> 11cedc39e663
Step #0 - "Build": Step 8/24 : WORKDIR /app
Step #0 - "Build":  ---> Running in 39a89e89bb97
Step #0 - "Build": Removing intermediate container 39a89e89bb97
Step #0 - "Build":  ---> 5094fb36903a
Step #0 - "Build": Step 9/24 : COPY --from=deps /app/node_modules ./node_modules
Step #0 - "Build":  ---> 55788afd8b67
Step #0 - "Build": Step 10/24 : COPY . .
Step #0 - "Build":  ---> 029db242d923
Step #0 - "Build": Step 11/24 : RUN npm run build
Step #0 - "Build":  ---> Running in 4afd6ab7f8e5
Step #0 - "Build": 
Step #0 - "Build": > votequest-app@0.1.0 build
Step #0 - "Build": > next build
Step #0 - "Build": 
Step #0 - "Build": Attention: Next.js now collects completely anonymous telemetry regarding usage.
Step #0 - "Build": This information is used to shape Next.js' roadmap and prioritize features.
Step #0 - "Build": You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
Step #0 - "Build": https://nextjs.org/telemetry
Step #0 - "Build": 
Step #0 - "Build": ▲ Next.js 16.2.4 (Turbopack)
Step #0 - "Build": 
Step #0 - "Build":   Creating an optimized production build ...
Step #0 - "Build": ✓ Compiled successfully in 6.5s
Step #0 - "Build":   Running TypeScript ...
Step #0 - "Build":  [91mFailed to type check.
Step #0 - "Build": 
Step #0 - "Build":  [0m [91m./src/app/page.tsx:140:50
Step #0 - "Build": Type error: Type '(tab: Tab, msg?: string) => void' is not assignable to type '(tab: string, msg?: string | undefined) => void'.
Step #0 - "Build":   Types of parameters 'tab' and 'tab' are incompatible.
Step #0 - "Build":     Type 'string' is not assignable to type 'Tab'.
Step #0 - "Build": 
Step #0 - "Build":    [90m138 | [0m ...{ [90m/* PANELS */ [0m}
Step #0 - "Build":    [90m139 | [0m ...<main style={{ flex:  [35m1 [0m }}>
Step #0 - "Build":  [31m [1m> [0m  [90m140 | [0m ...  {activeTab ===  [32m'home' [0m      && < [33mHomePanel [0m onNavigate={navigate} xp={xp} quizScore={qu...
Step #0 - "Build":    [90m    | [0m                                                [31m [1m^ [0m
Step #0 - "Build":    [90m141 | [0m ...  {activeTab ===  [32m'chat' [0m      && < [33mChatPanel [0m initialMsg={chatInitialMsg} onClearInitial=...
Step #0 - "Build":    [90m142 | [0m ...  {activeTab ===  [32m'journey' [0m   && < [33mJourneyPanel [0m onXP={addXP} />}
Step #0 - "Build":    [90m143 | [0m ...  {activeTab ===  [32m'quiz' [0m      && < [33mQuizPanel [0m onXP={addXP} />}
Step #0 - "Build":  [0m [91mNext.js build worker exited with code: 1 and signal: null
Step #0 - "Build":  [0m [91mnpm notice
Step #0 - "Build": npm notice New major version of npm available! 10.8.2 -> 11.13.0
Step #0 - "Build": npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.13.0
Step #0 - "Build": npm notice To update run: npm install -g npm@11.13.0
Step #0 - "Build": npm notice
Step #0 - "Build": The command '/bin/sh -c npm run build' returned a non-zero code: 1
Finished Step #0 - "Build"
ERROR
ERROR: build step 0 "gcr.io/cloud-builders/docker" failed: step exited with non-zero status: 1
Step #0 - "Build":  [0m

starting build "5085f5f5-f2d3-40b9-b3e4-4fad7a5cc46e"

FETCHSOURCE
From https://github.com/HithaishiSP2004/votequest-app
 * branch            d80ca60ccaaa650840dfa1617b965cc590debe5f -> FETCH_HEAD
HEAD is now at d80ca60 Fix SpeechRecognition type conflict in ChatPanel
GitCommit:
d80ca60ccaaa650840dfa1617b965cc590debe5f
BUILD
Starting Step #0 - "Build"
Step #0 - "Build": Already have image (with digest): gcr.io/cloud-builders/docker
Step #0 - "Build": Sending build context to Docker daemon  1.023MB

Step #0 - "Build": Step 1/24 : FROM node:20-alpine AS base
Step #0 - "Build": 20-alpine: Pulling from library/node
Step #0 - "Build": 6a0ac1617861: Already exists
Step #0 - "Build": 4feea04c1543: Pulling fs layer
Step #0 - "Build": b2cbbfe903b0: Pulling fs layer
Step #0 - "Build": fff4e2c1b189: Pulling fs layer
Step #0 - "Build": fff4e2c1b189: Verifying Checksum
Step #0 - "Build": fff4e2c1b189: Download complete
Step #0 - "Build": b2cbbfe903b0: Verifying Checksum
Step #0 - "Build": b2cbbfe903b0: Download complete
Step #0 - "Build": 4feea04c1543: Verifying Checksum
Step #0 - "Build": 4feea04c1543: Download c
...
[Logs truncated due to log size limitations. For full logs, see https://console.cloud.google.com/logs/viewer?advancedFilter=resource.type%3D%22build%22+AND+resource.labels.build_id%3D%225085f5f5-f2d3-40b9-b3e4-4fad7a5cc46e%22+AND+resource.labels.build_trigger_id%3D%22a63e2abb-a6d8-42a5-9ab2-8c9224cd55d1%22&project=votequest-app.]
...
 #0 - "Build":    [90m    | [0m                                                [31m [1m^ [0m
Step #0 - "Build":    [90m141 | [0m ...  {activeTab ===  [32m'chat' [0m      && < [33mChatPanel [0m initialMsg={chatInitialMsg} onClearInitial=...
Step #0 - "Build":    [90m142 | [0m ...  {activeTab ===  [32m'journey' [0m   && < [33mJourneyPanel [0m onXP={addXP} />}
Step #0 - "Build":    [90m143 | [0m ...  {activeTab ===  [32m'quiz' [0m      && < [33mQuizPanel [0m onXP={addXP} />}
Step #0 - "Build":  [0m [91mNext.js build worker exited with code: 1 and signal: null
Step #0 - "Build":  [0m [91mnpm notice
Step #0 - "Build": npm notice New major version of npm available! 10.8.2 -> 11.13.0
Step #0 - "Build": npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.13.0
Step #0 - "Build": npm notice To update run: npm install -g npm@11.13.0
Step #0 - "Build": npm notice
Step #0 - "Build": The command '/bin/sh -c npm run build' returned a non-zero code: 1
Finished Step #0 - "Build"
ERROR
ERROR: build step 0 "gcr.io/cloud-builders/docker" failed: step exited with non-zero status: 1
Step #0 - "Build":  [0m


starting build "5085f5f5-f2d3-40b9-b3e4-4fad7a5cc46e"

FETCHSOURCE
From https://github.com/HithaishiSP2004/votequest-app
 * branch            d80ca60ccaaa650840dfa1617b965cc590debe5f -> FETCH_HEAD
HEAD is now at d80ca60 Fix SpeechRecognition type conflict in ChatPanel
GitCommit:
d80ca60ccaaa650840dfa1617b965cc590debe5f
BUILD
Starting Step #0 - "Build"
Step #0 - "Build": Already have image (with digest): gcr.io/cloud-builders/docker
Step #0 - "Build": Sending build context to Docker daemon  1.023MB

Step #0 - "Build": Step 1/24 : FROM node:20-alpine AS base
Step #0 - "Build": 20-alpine: Pulling from library/node
Step #0 - "Build": 6a0ac1617861: Already exists
Step #0 - "Build": 4feea04c1543: Pulling fs layer
Step #0 - "Build": b2cbbfe903b0: Pulling fs layer
Step #0 - "Build": fff4e2c1b189: Pulling fs layer
Step #0 - "Build": fff4e2c1b189: Verifying Checksum
Step #0 - "Build": fff4e2c1b189: Download complete
Step #0 - "Build": b2cbbfe903b0: Verifying Checksum
Step #0 - "Build": b2cbbfe903b0: Download complete
Step #0 - "Build": 4feea04c1543: Verifying Checksum
Step #0 - "Build": 4feea04c1543: Download complete
Step #0 - "Build": 4feea04c1543: Pull complete
Step #0 - "Build": b2cbbfe903b0: Pull complete
Step #0 - "Build": fff4e2c1b189: Pull complete
Step #0 - "Build": Digest: sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293
Step #0 - "Build": Status: Downloaded newer image for node:20-alpine
Step #0 - "Build":  ---> 11cedc39e663
Step #0 - "Build": Step 2/24 : FROM base AS deps
Step #0 - "Build":  ---> 11cedc39e663
Step #0 - "Build": Step 3/24 : RUN apk add --no-cache libc6-compat
Step #0 - "Build":  ---> Running in aa5668f6c576
Step #0 - "Build": (1/3) Installing musl-obstack (1.2.3-r2)
Step #0 - "Build": (2/3) Installing libucontext (1.3.3-r0)
Step #0 - "Build": (3/3) Installing gcompat (1.1.0-r4)
Step #0 - "Build": OK: 11.0 MiB in 21 packages
Step #0 - "Build": Removing intermediate container aa5668f6c576
Step #0 - "Build":  ---> 9e05e962a41d
Step #0 - "Build": Step 4/24 : WORKDIR /app
Step #0 - "Build":  ---> Running in aa744398e0f0
Step #0 - "Build": Removing intermediate container aa744398e0f0
Step #0 - "Build":  ---> a9de4c0304df
Step #0 - "Build": Step 5/24 : COPY package.json package-lock.json* ./
Step #0 - "Build":  ---> 1240ebb98ea2
Step #0 - "Build": Step 6/24 : RUN npm ci
Step #0 - "Build":  ---> Running in 476ec8e47829
Step #0 - "Build":  [91mnpm warn deprecated whatwg-encoding@2.0.0: Use @exodus/bytes instead for a more spec-conformant and faster implementation
Step #0 - "Build":  [0m [91mnpm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
Step #0 - "Build":  [0m [91mnpm warn deprecated glob@7.2.3: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
Step #0 - "Build":  [0m [91mnpm warn deprecated domexception@4.0.0: Use your platform's native DOMException instead
Step #0 - "Build":  [0m [91mnpm warn deprecated abab@2.0.6: Use your platform's native atob() and btoa() methods instead
Step #0 - "Build":  [0m
Step #0 - "Build": added 626 packages, and audited 627 packages in 18s
Step #0 - "Build": 
Step #0 - "Build": 169 packages are looking for funding
Step #0 - "Build":   run `npm fund` for details
Step #0 - "Build": 
Step #0 - "Build": 6 vulnerabilities (4 low, 2 moderate)
Step #0 - "Build": 
Step #0 - "Build": To address all issues (including breaking changes), run:
Step #0 - "Build":   npm audit fix --force
Step #0 - "Build": 
Step #0 - "Build": Run `npm audit` for details.
Step #0 - "Build":  [91mnpm notice
Step #0 - "Build": npm notice New major version of npm available! 10.8.2 -> 11.13.0
Step #0 - "Build": npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.13.0
Step #0 - "Build": npm notice To update run: npm install -g npm@11.13.0
Step #0 - "Build": npm notice
Step #0 - "Build":  [0mRemoving intermediate container 476ec8e47829
Step #0 - "Build":  ---> 822f47651d33
Step #0 - "Build": Step 7/24 : FROM base AS builder
Step #0 - "Build":  ---> 11cedc39e663
Step #0 - "Build": Step 8/24 : WORKDIR /app
Step #0 - "Build":  ---> Running in 39a89e89bb97
Step #0 - "Build": Removing intermediate container 39a89e89bb97
Step #0 - "Build":  ---> 5094fb36903a
Step #0 - "Build": Step 9/24 : COPY --from=deps /app/node_modules ./node_modules
Step #0 - "Build":  ---> 55788afd8b67
Step #0 - "Build": Step 10/24 : COPY . .
Step #0 - "Build":  ---> 029db242d923
Step #0 - "Build": Step 11/24 : RUN npm run build
Step #0 - "Build":  ---> Running in 4afd6ab7f8e5
Step #0 - "Build": 
Step #0 - "Build": > votequest-app@0.1.0 build
Step #0 - "Build": > next build
Step #0 - "Build": 
Step #0 - "Build": Attention: Next.js now collects completely anonymous telemetry regarding usage.
Step #0 - "Build": This information is used to shape Next.js' roadmap and prioritize features.
Step #0 - "Build": You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
Step #0 - "Build": https://nextjs.org/telemetry
Step #0 - "Build": 
Step #0 - "Build": ▲ Next.js 16.2.4 (Turbopack)
Step #0 - "Build": 
Step #0 - "Build":   Creating an optimized production build ...
Step #0 - "Build": ✓ Compiled successfully in 6.5s
Step #0 - "Build":   Running TypeScript ...
Step #0 - "Build":  [91mFailed to type check.
Step #0 - "Build": 
Step #0 - "Build":  [0m [91m./src/app/page.tsx:140:50
Step #0 - "Build": Type error: Type '(tab: Tab, msg?: string) => void' is not assignable to type '(tab: string, msg?: string | undefined) => void'.
Step #0 - "Build":   Types of parameters 'tab' and 'tab' are incompatible.
Step #0 - "Build":     Type 'string' is not assignable to type 'Tab'.
Step #0 - "Build": 
Step #0 - "Build":    [90m138 | [0m ...{ [90m/* PANELS */ [0m}
Step #0 - "Build":    [90m139 | [0m ...<main style={{ flex:  [35m1 [0m }}>
Step #0 - "Build":  [31m [1m> [0m  [90m140 | [0m ...  {activeTab ===  [32m'home' [0m      && < [33mHomePanel [0m onNavigate={navigate} xp={xp} quizScore={qu...
Step #0 - "Build":    [90m    | [0m                                                [31m [1m^ [0m
Step #0 - "Build":    [90m141 | [0m ...  {activeTab ===  [32m'chat' [0m      && < [33mChatPanel [0m initialMsg={chatInitialMsg} onClearInitial=...
Step #0 - "Build":    [90m142 | [0m ...  {activeTab ===  [32m'journey' [0m   && < [33mJourneyPanel [0m onXP={addXP} />}
Step #0 - "Build":    [90m143 | [0m ...  {activeTab ===  [32m'quiz' [0m      && < [33mQuizPanel [0m onXP={addXP} />}
Step #0 - "Build":  [0m [91mNext.js build worker exited with code: 1 and signal: null
Step #0 - "Build":  [0m [91mnpm notice
Step #0 - "Build": npm notice New major version of npm available! 10.8.2 -> 11.13.0
Step #0 - "Build": npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.13.0
Step #0 - "Build": npm notice To update run: npm install -g npm@11.13.0
Step #0 - "Build": npm notice
Step #0 - "Build": The command '/bin/sh -c npm run build' returned a non-zero code: 1
Finished Step #0 - "Build"
ERROR
ERROR: build step 0 "gcr.io/cloud-builders/docker" failed: step exited with non-zero status: 1
Step #0 - "Build":  [0m


starting build "5085f5f5-f2d3-40b9-b3e4-4fad7a5cc46e"

FETCHSOURCE
From https://github.com/HithaishiSP2004/votequest-app
 * branch            d80ca60ccaaa650840dfa1617b965cc590debe5f -> FETCH_HEAD
HEAD is now at d80ca60 Fix SpeechRecognition type conflict in ChatPanel
GitCommit:
d80ca60ccaaa650840dfa1617b965cc590debe5f
BUILD
Starting Step #0 - "Build"
Step #0 - "Build": Already have image (with digest): gcr.io/cloud-builders/docker
Step #0 - "Build": Sending build context to Docker daemon  1.023MB

Step #0 - "Build": Step 1/24 : FROM node:20-alpine AS base
Step #0 - "Build": 20-alpine: Pulling from library/node
Step #0 - "Build": 6a0ac1617861: Already exists
Step #0 - "Build": 4feea04c1543: Pulling fs layer
Step #0 - "Build": b2cbbfe903b0: Pulling fs layer
Step #0 - "Build": fff4e2c1b189: Pulling fs layer
Step #0 - "Build": fff4e2c1b189: Verifying Checksum
Step #0 - "Build": fff4e2c1b189: Download complete
Step #0 - "Build": b2cbbfe903b0: Verifying Checksum
Step #0 - "Build": b2cbbfe903b0: Download complete
Step #0 - "Build": 4feea04c1543: Verifying Checksum
Step #0 - "Build": 4feea04c1543: Download complete
Step #0 - "Build": 4feea04c1543: Pull complete
Step #0 - "Build": b2cbbfe903b0: Pull complete
Step #0 - "Build": fff4e2c1b189: Pull complete
Step #0 - "Build": Digest: sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293
Step #0 - "Build": Status: Downloaded newer image for node:20-alpine
Step #0 - "Build":  ---> 11cedc39e663
Step #0 - "Build": Step 2/24 : FROM base AS deps
Step #0 - "Build":  ---> 11cedc39e663
Step #0 - "Build": Step 3/24 : RUN apk add --no-cache libc6-compat
Step #0 - "Build":  ---> Running in aa5668f6c576
Step #0 - "Build": (1/3) Installing musl-obstack (1.2.3-r2)
Step #0 - "Build": (2/3) Installing libucontext (1.3.3-r0)
Step #0 - "Build": (3/3) Installing gcompat (1.1.0-r4)
Step #0 - "Build": OK: 11.0 MiB in 21 packages
Step #0 - "Build": Removing intermediate container aa5668f6c576
Step #0 - "Build":  ---> 9e05e962a41d
Step #0 - "Build": Step 4/24 : WORKDIR /app
Step #0 - "Build":  ---> Running in aa744398e0f0
Step #0 - "Build": Removing intermediate container aa744398e0f0
Step #0 - "Build":  ---> a9de4c0304df
Step #0 - "Build": Step 5/24 : COPY package.json package-lock.json* ./
Step #0 - "Build":  ---> 1240ebb98ea2
Step #0 - "Build": Step 6/24 : RUN npm ci
Step #0 - "Build":  ---> Running in 476ec8e47829
Step #0 - "Build":  [91mnpm warn deprecated whatwg-encoding@2.0.0: Use @exodus/bytes instead for a more spec-conformant and faster implementation
Step #0 - "Build":  [0m [91mnpm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
Step #0 - "Build":  [0m [91mnpm warn deprecated glob@7.2.3: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
Step #0 - "Build":  [0m [91mnpm warn deprecated domexception@4.0.0: Use your platform's native DOMException instead
Step #0 - "Build":  [0m [91mnpm warn deprecated abab@2.0.6: Use your platform's native atob() and btoa() methods instead
Step #0 - "Build":  [0m
Step #0 - "Build": added 626 packages, and audited 627 packages in 18s
Step #0 - "Build": 
Step #0 - "Build": 169 packages are looking for funding
Step #0 - "Build":   run `npm fund` for details
Step #0 - "Build": 
Step #0 - "Build": 6 vulnerabilities (4 low, 2 moderate)
Step #0 - "Build": 
Step #0 - "Build": To address all issues (including breaking changes), run:
Step #0 - "Build":   npm audit fix --force
Step #0 - "Build": 
Step #0 - "Build": Run `npm audit` for details.
Step #0 - "Build":  [91mnpm notice
Step #0 - "Build": npm notice New major version of npm available! 10.8.2 -> 11.13.0
Step #0 - "Build": npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.13.0
Step #0 - "Build": npm notice To update run: npm install -g npm@11.13.0
Step #0 - "Build": npm notice
Step #0 - "Build":  [0mRemoving intermediate container 476ec8e47829
Step #0 - "Build":  ---> 822f47651d33
Step #0 - "Build": Step 7/24 : FROM base AS builder
Step #0 - "Build":  ---> 11cedc39e663
Step #0 - "Build": Step 8/24 : WORKDIR /app
Step #0 - "Build":  ---> Running in 39a89e89bb97
Step #0 - "Build": Removing intermediate container 39a89e89bb97
Step #0 - "Build":  ---> 5094fb36903a
Step #0 - "Build": Step 9/24 : COPY --from=deps /app/node_modules ./node_modules
Step #0 - "Build":  ---> 55788afd8b67
Step #0 - "Build": Step 10/24 : COPY . .
Step #0 - "Build":  ---> 029db242d923
Step #0 - "Build": Step 11/24 : RUN npm run build
Step #0 - "Build":  ---> Running in 4afd6ab7f8e5
Step #0 - "Build": 
Step #0 - "Build": > votequest-app@0.1.0 build
Step #0 - "Build": > next build
Step #0 - "Build": 
Step #0 - "Build": Attention: Next.js now collects completely anonymous telemetry regarding usage.
Step #0 - "Build": This information is used to shape Next.js' roadmap and prioritize features.
Step #0 - "Build": You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
Step #0 - "Build": https://nextjs.org/telemetry
Step #0 - "Build": 
Step #0 - "Build": ▲ Next.js 16.2.4 (Turbopack)
Step #0 - "Build": 
Step #0 - "Build":   Creating an optimized production build ...
Step #0 - "Build": ✓ Compiled successfully in 6.5s
Step #0 - "Build":   Running TypeScript ...
Step #0 - "Build":  [91mFailed to type check.
Step #0 - "Build": 
Step #0 - "Build":  [0m [91m./src/app/page.tsx:140:50
Step #0 - "Build": Type error: Type '(tab: Tab, msg?: string) => void' is not assignable to type '(tab: string, msg?: string | undefined) => void'.
Step #0 - "Build":   Types of parameters 'tab' and 'tab' are incompatible.
Step #0 - "Build":     Type 'string' is not assignable to type 'Tab'.
Step #0 - "Build": 
Step #0 - "Build":    [90m138 | [0m ...{ [90m/* PANELS */ [0m}
Step #0 - "Build":    [90m139 | [0m ...<main style={{ flex:  [35m1 [0m }}>
Step #0 - "Build":  [31m [1m> [0m  [90m140 | [0m ...  {activeTab ===  [32m'home' [0m      && < [33mHomePanel [0m onNavigate={navigate} xp={xp} quizScore={qu...
Step #0 - "Build":    [90m    | [0m                                                [31m [1m^ [0m
Step #0 - "Build":    [90m141 | [0m ...  {activeTab ===  [32m'chat' [0m      && < [33mChatPanel [0m initialMsg={chatInitialMsg} onClearInitial=...
Step #0 - "Build":    [90m142 | [0m ...  {activeTab ===  [32m'journey' [0m   && < [33mJourneyPanel [0m onXP={addXP} />}
Step #0 - "Build":    [90m143 | [0m ...  {activeTab ===  [32m'quiz' [0m      && < [33mQuizPanel [0m onXP={addXP} />}
Step #0 - "Build":  [0m [91mNext.js build worker exited with code: 1 and signal: null
Step #0 - "Build":  [0m [91mnpm notice
Step #0 - "Build": npm notice New major version of npm available! 10.8.2 -> 11.13.0
Step #0 - "Build": npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.13.0
Step #0 - "Build": npm notice To update run: npm install -g npm@11.13.0
Step #0 - "Build": npm notice
Step #0 - "Build": The command '/bin/sh -c npm run build' returned a non-zero code: 1
Finished Step #0 - "Build"
ERROR
ERROR: build step 0 "gcr.io/cloud-builders/docker" failed: step exited with non-zero status: 1
Step #0 - "Build":  [0m


starting build "5085f5f5-f2d3-40b9-b3e4-4fad7a5cc46e"

FETCHSOURCE
From https://github.com/HithaishiSP2004/votequest-app
 * branch            d80ca60ccaaa650840dfa1617b965cc590debe5f -> FETCH_HEAD
HEAD is now at d80ca60 Fix SpeechRecognition type conflict in ChatPanel
GitCommit:
d80ca60ccaaa650840dfa1617b965cc590debe5f
BUILD
Starting Step #0 - "Build"
Step #0 - "Build": Already have image (with digest): gcr.io/cloud-builders/docker
Step #0 - "Build": Sending build context to Docker daemon  1.023MB

Step #0 - "Build": Step 1/24 : FROM node:20-alpine AS base
Step #0 - "Build": 20-alpine: Pulling from library/node
Step #0 - "Build": 6a0ac1617861: Already exists
Step #0 - "Build": 4feea04c1543: Pulling fs layer
Step #0 - "Build": b2cbbfe903b0: Pulling fs layer
Step #0 - "Build": fff4e2c1b189: Pulling fs layer
Step #0 - "Build": fff4e2c1b189: Verifying Checksum
Step #0 - "Build": fff4e2c1b189: Download complete
Step #0 - "Build": b2cbbfe903b0: Verifying Checksum
Step #0 - "Build": b2cbbfe903b0: Download complete
Step #0 - "Build": 4feea04c1543: Verifying Checksum
Step #0 - "Build": 4feea04c1543: Download complete
Step #0 - "Build": 4feea04c1543: Pull complete
Step #0 - "Build": b2cbbfe903b0: Pull complete
Step #0 - "Build": fff4e2c1b189: Pull complete
Step #0 - "Build": Digest: sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293
Step #0 - "Build": Status: Downloaded newer image for node:20-alpine
Step #0 - "Build":  ---> 11cedc39e663
Step #0 - "Build": Step 2/24 : FROM base AS deps
Step #0 - "Build":  ---> 11cedc39e663
Step #0 - "Build": Step 3/24 : RUN apk add --no-cache libc6-compat
Step #0 - "Build":  ---> Running in aa5668f6c576
Step #0 - "Build": (1/3) Installing musl-obstack (1.2.3-r2)
Step #0 - "Build": (2/3) Installing libucontext (1.3.3-r0)
Step #0 - "Build": (3/3) Installing gcompat (1.1.0-r4)
Step #0 - "Build": OK: 11.0 MiB in 21 packages
Step #0 - "Build": Removing intermediate container aa5668f6c576
Step #0 - "Build":  ---> 9e05e962a41d
Step #0 - "Build": Step 4/24 : WORKDIR /app
Step #0 - "Build":  ---> Running in aa744398e0f0
Step #0 - "Build": Removing intermediate container aa744398e0f0
Step #0 - "Build":  ---> a9de4c0304df
Step #0 - "Build": Step 5/24 : COPY package.json package-lock.json* ./
Step #0 - "Build":  ---> 1240ebb98ea2
Step #0 - "Build": Step 6/24 : RUN npm ci
Step #0 - "Build":  ---> Running in 476ec8e47829
Step #0 - "Build":  [91mnpm warn deprecated whatwg-encoding@2.0.0: Use @exodus/bytes instead for a more spec-conformant and faster implementation
Step #0 - "Build":  [0m [91mnpm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
Step #0 - "Build":  [0m [91mnpm warn deprecated glob@7.2.3: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
Step #0 - "Build":  [0m [91mnpm warn deprecated domexception@4.0.0: Use your platform's native DOMException instead
Step #0 - "Build":  [0m [91mnpm warn deprecated abab@2.0.6: Use your platform's native atob() and btoa() methods instead
Step #0 - "Build":  [0m
Step #0 - "Build": added 626 packages, and audited 627 packages in 18s
Step #0 - "Build": 
Step #0 - "Build": 169 packages are looking for funding
Step #0 - "Build":   run `npm fund` for details
Step #0 - "Build": 
Step #0 - "Build": 6 vulnerabilities (4 low, 2 moderate)
Step #0 - "Build": 
Step #0 - "Build": To address all issues (including breaking changes), run:
Step #0 - "Build":   npm audit fix --force
Step #0 - "Build": 
Step #0 - "Build": Run `npm audit` for details.
Step #0 - "Build":  [91mnpm notice
Step #0 - "Build": npm notice New major version of npm available! 10.8.2 -> 11.13.0
Step #0 - "Build": npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.13.0
Step #0 - "Build": npm notice To update run: npm install -g npm@11.13.0
Step #0 - "Build": npm notice
Step #0 - "Build":  [0mRemoving intermediate container 476ec8e47829
Step #0 - "Build":  ---> 822f47651d33
Step #0 - "Build": Step 7/24 : FROM base AS builder
Step #0 - "Build":  ---> 11cedc39e663
Step #0 - "Build": Step 8/24 : WORKDIR /app
Step #0 - "Build":  ---> Running in 39a89e89bb97
Step #0 - "Build": Removing intermediate container 39a89e89bb97
Step #0 - "Build":  ---> 5094fb36903a
Step #0 - "Build": Step 9/24 : COPY --from=deps /app/node_modules ./node_modules
Step #0 - "Build":  ---> 55788afd8b67
Step #0 - "Build": Step 10/24 : COPY . .
Step #0 - "Build":  ---> 029db242d923
Step #0 - "Build": Step 11/24 : RUN npm run build
Step #0 - "Build":  ---> Running in 4afd6ab7f8e5
Step #0 - "Build": 
Step #0 - "Build": > votequest-app@0.1.0 build
Step #0 - "Build": > next build
Step #0 - "Build": 
Step #0 - "Build": Attention: Next.js now collects completely anonymous telemetry regarding usage.
Step #0 - "Build": This information is used to shape Next.js' roadmap and prioritize features.
Step #0 - "Build": You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
Step #0 - "Build": https://nextjs.org/telemetry
Step #0 - "Build": 
Step #0 - "Build": ▲ Next.js 16.2.4 (Turbopack)
Step #0 - "Build": 
Step #0 - "Build":   Creating an optimized production build ...
Step #0 - "Build": ✓ Compiled successfully in 6.5s
Step #0 - "Build":   Running TypeScript ...
Step #0 - "Build":  [91mFailed to type check.
Step #0 - "Build": 
Step #0 - "Build":  [0m [91m./src/app/page.tsx:140:50
Step #0 - "Build": Type error: Type '(tab: Tab, msg?: string) => void' is not assignable to type '(tab: string, msg?: string | undefined) => void'.
Step #0 - "Build":   Types of parameters 'tab' and 'tab' are incompatible.
Step #0 - "Build":     Type 'string' is not assignable to type 'Tab'.
Step #0 - "Build": 
Step #0 - "Build":    [90m138 | [0m ...{ [90m/* PANELS */ [0m}
Step #0 - "Build":    [90m139 | [0m ...<main style={{ flex:  [35m1 [0m }}>
Step #0 - "Build":  [31m [1m> [0m  [90m140 | [0m ...  {activeTab ===  [32m'home' [0m      && < [33mHomePanel [0m onNavigate={navigate} xp={xp} quizScore={qu...
Step #0 - "Build":    [90m    | [0m                                                [31m [1m^ [0m
Step #0 - "Build":    [90m141 | [0m ...  {activeTab ===  [32m'chat' [0m      && < [33mChatPanel [0m initialMsg={chatInitialMsg} onClearInitial=...
Step #0 - "Build":    [90m142 | [0m ...  {activeTab ===  [32m'journey' [0m   && < [33mJourneyPanel [0m onXP={addXP} />}
Step #0 - "Build":    [90m143 | [0m ...  {activeTab ===  [32m'quiz' [0m      && < [33mQuizPanel [0m onXP={addXP} />}
Step #0 - "Build":  [0m [91mNext.js build worker exited with code: 1 and signal: null
Step #0 - "Build":  [0m [91mnpm notice
Step #0 - "Build": npm notice New major version of npm available! 10.8.2 -> 11.13.0
Step #0 - "Build": npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.13.0
Step #0 - "Build": npm notice To update run: npm install -g npm@11.13.0
Step #0 - "Build": npm notice
Step #0 - "Build": The command '/bin/sh -c npm run build' returned a non-zero code: 1
Finished Step #0 - "Build"
ERROR
ERROR: build step 0 "gcr.io/cloud-builders/docker" failed: step exited with non-zero status: 1
Step #0 - "Build":  [0m


starting build "5085f5f5-f2d3-40b9-b3e4-4fad7a5cc46e"

FETCHSOURCE
From https://github.com/HithaishiSP2004/votequest-app
 * branch            d80ca60ccaaa650840dfa1617b965cc590debe5f -> FETCH_HEAD
HEAD is now at d80ca60 Fix SpeechRecognition type conflict in ChatPanel
GitCommit:
d80ca60ccaaa650840dfa1617b965cc590debe5f
BUILD
Starting Step #0 - "Build"
Step #0 - "Build": Already have image (with digest): gcr.io/cloud-builders/docker
Step #0 - "Build": Sending build context to Docker daemon  1.023MB

Step #0 - "Build": Step 1/24 : FROM node:20-alpine AS base
Step #0 - "Build": 20-alpine: Pulling from library/node
Step #0 - "Build": 6a0ac1617861: Already exists
Step #0 - "Build": 4feea04c1543: Pulling fs layer
Step #0 - "Build": b2cbbfe903b0: Pulling fs layer
Step #0 - "Build": fff4e2c1b189: Pulling fs layer
Step #0 - "Build": fff4e2c1b189: Verifying Checksum
Step #0 - "Build": fff4e2c1b189: Download complete
Step #0 - "Build": b2cbbfe903b0: Verifying Checksum
Step #0 - "Build": b2cbbfe903b0: Download complete
Step #0 - "Build": 4feea04c1543: Verifying Checksum
Step #0 - "Build": 4feea04c1543: Download complete
Step #0 - "Build": 4feea04c1543: Pull complete
Step #0 - "Build": b2cbbfe903b0: Pull complete
Step #0 - "Build": fff4e2c1b189: Pull complete
Step #0 - "Build": Digest: sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293
Step #0 - "Build": Status: Downloaded newer image for node:20-alpine
Step #0 - "Build":  ---> 11cedc39e663
Step #0 - "Build": Step 2/24 : FROM base AS deps
Step #0 - "Build":  ---> 11cedc39e663
Step #0 - "Build": Step 3/24 : RUN apk add --no-cache libc6-compat
Step #0 - "Build":  ---> Running in aa5668f6c576
Step #0 - "Build": (1/3) Installing musl-obstack (1.2.3-r2)
Step #0 - "Build": (2/3) Installing libucontext (1.3.3-r0)
Step #0 - "Build": (3/3) Installing gcompat (1.1.0-r4)
Step #0 - "Build": OK: 11.0 MiB in 21 packages
Step #0 - "Build": Removing intermediate container aa5668f6c576
Step #0 - "Build":  ---> 9e05e962a41d
Step #0 - "Build": Step 4/24 : WORKDIR /app
Step #0 - "Build":  ---> Running in aa744398e0f0
Step #0 - "Build": Removing intermediate container aa744398e0f0
Step #0 - "Build":  ---> a9de4c0304df
Step #0 - "Build": Step 5/24 : COPY package.json package-lock.json* ./
Step #0 - "Build":  ---> 1240ebb98ea2
Step #0 - "Build": Step 6/24 : RUN npm ci
Step #0 - "Build":  ---> Running in 476ec8e47829
Step #0 - "Build":  [91mnpm warn deprecated whatwg-encoding@2.0.0: Use @exodus/bytes instead for a more spec-conformant and faster implementation
Step #0 - "Build":  [0m [91mnpm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
Step #0 - "Build":  [0m [91mnpm warn deprecated glob@7.2.3: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
Step #0 - "Build":  [0m [91mnpm warn deprecated domexception@4.0.0: Use your platform's native DOMException instead
Step #0 - "Build":  [0m [91mnpm warn deprecated abab@2.0.6: Use your platform's native atob() and btoa() methods instead
Step #0 - "Build":  [0m
Step #0 - "Build": added 626 packages, and audited 627 packages in 18s
Step #0 - "Build": 
Step #0 - "Build": 169 packages are looking for funding
Step #0 - "Build":   run `npm fund` for details
Step #0 - "Build": 
Step #0 - "Build": 6 vulnerabilities (4 low, 2 moderate)
Step #0 - "Build": 
Step #0 - "Build": To address all issues (including breaking changes), run:
Step #0 - "Build":   npm audit fix --force
Step #0 - "Build": 
Step #0 - "Build": Run `npm audit` for details.
Step #0 - "Build":  [91mnpm notice
Step #0 - "Build": npm notice New major version of npm available! 10.8.2 -> 11.13.0
Step #0 - "Build": npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.13.0
Step #0 - "Build": npm notice To update run: npm install -g npm@11.13.0
Step #0 - "Build": npm notice
Step #0 - "Build":  [0mRemoving intermediate container 476ec8e47829
Step #0 - "Build":  ---> 822f47651d33
Step #0 - "Build": Step 7/24 : FROM base AS builder
Step #0 - "Build":  ---> 11cedc39e663
Step #0 - "Build": Step 8/24 : WORKDIR /app
Step #0 - "Build":  ---> Running in 39a89e89bb97
Step #0 - "Build": Removing intermediate container 39a89e89bb97
Step #0 - "Build":  ---> 5094fb36903a
Step #0 - "Build": Step 9/24 : COPY --from=deps /app/node_modules ./node_modules
Step #0 - "Build":  ---> 55788afd8b67
Step #0 - "Build": Step 10/24 : COPY . .
Step #0 - "Build":  ---> 029db242d923
Step #0 - "Build": Step 11/24 : RUN npm run build
Step #0 - "Build":  ---> Running in 4afd6ab7f8e5
Step #0 - "Build": 
Step #0 - "Build": > votequest-app@0.1.0 build
Step #0 - "Build": > next build
Step #0 - "Build": 
Step #0 - "Build": Attention: Next.js now collects completely anonymous telemetry regarding usage.
Step #0 - "Build": This information is used to shape Next.js' roadmap and prioritize features.
Step #0 - "Build": You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
Step #0 - "Build": https://nextjs.org/telemetry
Step #0 - "Build": 
Step #0 - "Build": ▲ Next.js 16.2.4 (Turbopack)
Step #0 - "Build": 
Step #0 - "Build":   Creating an optimized production build ...
Step #0 - "Build": ✓ Compiled successfully in 6.5s
Step #0 - "Build":   Running TypeScript ...
Step #0 - "Build":  [91mFailed to type check.
Step #0 - "Build": 
Step #0 - "Build":  [0m [91m./src/app/page.tsx:140:50
Step #0 - "Build": Type error: Type '(tab: Tab, msg?: string) => void' is not assignable to type '(tab: string, msg?: string | undefined) => void'.
Step #0 - "Build":   Types of parameters 'tab' and 'tab' are incompatible.
Step #0 - "Build":     Type 'string' is not assignable to type 'Tab'.
Step #0 - "Build": 
Step #0 - "Build":    [90m138 | [0m ...{ [90m/* PANELS */ [0m}
Step #0 - "Build":    [90m139 | [0m ...<main style={{ flex:  [35m1 [0m }}>
Step #0 - "Build":  [31m [1m> [0m  [90m140 | [0m ...  {activeTab ===  [32m'home' [0m      && < [33mHomePanel [0m onNavigate={navigate} xp={xp} quizScore={qu...
Step #0 - "Build":    [90m    | [0m                                                [31m [1m^ [0m
Step #0 - "Build":    [90m141 | [0m ...  {activeTab ===  [32m'chat' [0m      && < [33mChatPanel [0m initialMsg={chatInitialMsg} onClearInitial=...
Step #0 - "Build":    [90m142 | [0m ...  {activeTab ===  [32m'journey' [0m   && < [33mJourneyPanel [0m onXP={addXP} />}
Step #0 - "Build":    [90m143 | [0m ...  {activeTab ===  [32m'quiz' [0m      && < [33mQuizPanel [0m onXP={addXP} />}
Step #0 - "Build":  [0m [91mNext.js build worker exited with code: 1 and signal: null
Step #0 - "Build":  [0m [91mnpm notice
Step #0 - "Build": npm notice New major version of npm available! 10.8.2 -> 11.13.0
Step #0 - "Build": npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.13.0
Step #0 - "Build": npm notice To update run: npm install -g npm@11.13.0
Step #0 - "Build": npm notice
Step #0 - "Build": The command '/bin/sh -c npm run build' returned a non-zero code: 1
Finished Step #0 - "Build"
ERROR
ERROR: build step 0 "gcr.io/cloud-builders/docker" failed: step exited with non-zero status: 1
Step #0 - "Build":  [0m

Build Log: https://console.cloud.google.com/logs/viewer?advancedFilter=resource.type%3D%22build%22+AND+resource.labels.build_id%3D%225085f5f5-f2d3-40b9-b3e4-4fad7a5cc46e%22+AND+resource.labels.build_trigger_id%3D%22a63e2abb-a6d8-42a5-9ab2-8c9224cd55d1%22&project=votequest-app