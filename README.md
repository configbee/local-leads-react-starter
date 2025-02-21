# Local Leads React Starter Template with ConfigBee's Feature Flags

A lightweight+Vite React starter template built with Vite for managing leads via local storage, featuring hidden import/export powered by [ConfigBee](https://configbee.com/) **Feature Flags**.

## Overview

local-leads-react-starter is a simple yet powerful project template designed to help you quickly build and experiment with a lead management application.

The application stores leads in your browser's local storage, making it an ideal learning tool for React.

With hidden functionalities like import/export unlocked through Configbee feature flags, this template provides both simplicity and scalability.

It works **without ConfigBee’s feature flags**, but by setting up a **ConfigBee account**, you can unlock hidden features(import,export, and hero section) and dynamically control configurations.


## Features

- **Fast & Lightweight:** Developed using React and Vite for an optimized development experience.
- **Local Storage:** Seamlessly store and manage leads without the need for a backend.
- **Configbee Integration:** Unlock hidden import/export functionalities via feature flags.
- **GitHub Codespaces Ready:** Run the project directly in GitHub Codespaces without any code modifications.
- **Easy Customization:** Use as a base template for your projects or for learning React fundamentals.

## Getting Started

### Prerequisites

- **Node.js:** Latest LTS Version
- **npm or yarn:** For installing project dependencies.


### Recommended: Fork Before Cloning

Before cloning the repository, it's recommended to fork the project on GitHub. This allows you to work on your own copy and contribute back if you make improvements.

1. **Fork the Repository:**

   - Go to the GitHub page of [local-leads-react-starter](https://github.com/configbee/local-leads-react-starter).
   - Click the "Fork" button in the top-right corner to create your own fork.

2. **Clone Your Fork:**

   ```bash
   git clone https://github.com/your-username/local-leads-react-starter.git
   cd local-leads-react-starter
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Run the Application:**

   ```bash
   npm run dev
   ```
   Open your browser and navigate to the provided URL (typically http://localhost:5173) to see the application in action.

## GitHub Codespaces

local-leads-react-starter is pre-configured for a seamless experience in GitHub Codespaces. If you're already on the repository page, simply click the "Code" button and choose **"Open with Codespaces"** to launch your environment.

Once your Codespace is ready:

1. **Start the Application:**
   - Open the integrated terminal.
   - Run the development server:
     ```bash
     npm run dev
     ```

2. **Access the Application:**
   - GitHub Codespaces automatically forwards the development server's port.
   - A popup with an "Open in Browser" button will appear—click it to view your running application.


## Unlocking Hidden Functionalities with ConfigBee Feature Flags

The project includes hidden functionalities—specifically the import and export of leads—that are controlled via Configbee feature flags.

1. **Create a ConfigBee Account**  
   Sign up at [ConfigBee](https://configbee.com/) (a free plan is available and more than sufficient).
   
2. **Set Up a Project & Environments**  
   During signup, you'll create your first project and environment. Additional projects can be added as needed.
   
3. **Configure Environment Variables**  
  The following environment variables need to be set. You can set them in .env.local or using other methods
   
   | Variable | Description |
   | ---- | ---- |
   | VITE_CB_ACCOUNT_ID | Your ConfigBee account ID |
   | VITE_CB_PROJECT_ID | Your ConfigBee project ID |
   | VITE_CB_ENV_ID | Your ConfigBee environment ID |

   To find these values in **ConfigBee** Navigate to **Project → Environment → SDK Integrations**.
   For example, your Project could be **My Leads App**, and your Environment could be **Staging** or **Live**, depending on your setup.\
   \
   **Note**: After adding/updating environment variables, restarting development server/redeploy the app may be required.

5. **Add Feature Flags & Options in ConfigBee**  
   Navigate to **Flags & Options** in your ConfigBee project and add the following as required:

   | Type | Key | Name |
   | ---- | ---- | ---- |
   | Flag | show_import | Show Import |
   | Flag | show_export | Show Export |
   | Text | app_title | App Title |
   | Flag | show_hero | Show Hero |
   | Text | hero_title | Hero Title |
   | Text | hero_description | Hero Description |

6. **Update Feature Flags in Real Time**  
   You can switch flags on/off or modify option values per environment and publish changes instantly with ConfigBee’s real-time updates.


## Contributing
Contributions are welcome! If you have any suggestions, improvements, or bug fixes, please open an issue or submit a pull request.

## Resources
- [NOTICE](https://github.com/configbee/cb-client-reactjs/blob/main/NOTICE)
- [LICENSE](https://github.com/configbee/cb-client-reactjs/blob/main/LICENSE)

