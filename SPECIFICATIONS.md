# Project Specifications

This document outlines the vision, principles, and mandatory specifications for the Diesel Jenny website.

---

## 1. Core Vision

### 1.1. Purpose
The primary goal is to develop a central online hub for the electronic producer alias, Diesel Jenny. The website will serve as a simple, bold, and minimalist platform to showcase music, videos, and press materials, while providing key links to external platforms like Bandcamp and Spotify.

### 1.2. Guiding Principles
The project will adhere to the following principles:
*   **Start Simple & Iterate:** Begin with a Minimum Viable Product (MVP) and progressively add features.
*   **Flexible & Robust Architecture:** Build a system that is both solid and adaptable to future changes.
*   **Responsive, Mobile-First Design:** Ensure a seamless and high-quality experience on all devices.
*   **Performance & Optimization:** Prioritize fast load times through asset optimization and efficient code.
*   **Accessibility (A11y):** Commit to making the site usable by everyone, regardless of ability.
*   **Security by Design:** Implement security best practices from the outset.
*   **Version Control:** Use Git and GitHub for comprehensive version control.

---

## 2. Technical & Design Specifications

### 2.1. Header Identity
- **Official Header:** The primary header text for the website must be the official "Diesel Jenny" text logo.
- **Implementation:** The `dj-text-white.png` or `dj-text-black.png` image asset must be used for the main header title, depending on the background color. It should not be recreated with a web font.

### 2.2. Content Layout
- **Static Main Content:** All primary content elements are considered "main content" and must exist within the main, static layout of the page. They cannot overlap each other or float freely. This includes:
    - Header/Logo
    - Biography Text
    - Bandcamp Embed
    - YouTube Embed
- **Dynamic Ancillary Content:** Ancillary, decorative, or secondary interactive elements are permitted to have dynamic positioning (e.g., floating, moving, animated). This includes:
    - Audio sting trigger elements
    - Phrases from the `Phrasebook`

### 2.3. Audio Interaction
- **Trigger:** Audio stings must be triggered by a clear user action (click or hover) on an obvious interactive element.
- **Singleton Playback:** Only one audio sting can play at a time.
- **Choking:** Triggering a new sting must immediately stop the current one and start the new one.

### 2.4. Responsive Design
- **Mobile-First:** The mobile experience must be as intentional and well-designed as the desktop version.
- **Touch-Friendly:** Interactive elements must be appropriately sized and spaced for touch devices.

### 2.5. Accessibility (A11y)
- **Keyboard Navigation:** The entire site must be navigable and usable with a keyboard alone.
- **Focus States:** All interactive elements must have clear visual focus states (e.g., an outline on tab).
- **Alt Text:** All meaningful images must have descriptive `alt` text.

### 2.6. Performance
- **Fast Load:** The site must load quickly on average connections.
- **Lazy Loading:** Heavy assets (iframes, audio) should be loaded on-demand or after the initial page view is interactive.
- **Image Optimization:** All images must be optimized for web use to reduce file size.

### 2.7. Content Management
- **Centralized Config:** All user-editable text (Bio, Phrases, Links) must be stored in a single, simple configuration file (e.g., `config.ts`) separate from the UI components to simplify future updates.