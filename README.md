# Momang

> **Don't get caught by Momang!**

Momang is a small browser game built with **TypeScript** to practice **object-oriented programming (OOP)** in a frontend project.

The player has to complete missions without being caught by Momang, whose activities can temporarily distract her senses.

---

## What I learnt

- Classes and inheritance
- Interfaces and encapsulation
- Composition between objects
- Callbacks and event-driven logic
- Singleton pattern
- Game state management
- Randomized events
- Separation between game logic and UI

## Gameplay

Complete as many activities as possible **without being caught**, and earn bonus points by completing missions.

Momang performs random activities that temporarily occupy one of her senses:


- **Sight**
- **Hearing**
- **Smell**

Her state changes randomly, so you have to read the situation before acting.

### Missions

There are currently three types of missions:

- ** Allocated-time:** complete an activity within a given time.
- ** Repeated:** perform an action a certain number of times.
- ** Alternate:** perform actions in a specific sequence.

---

## Architecture

The project is structured around different classes, each with a specific responsibility.

```text
Game
├── Player
│   └── PlayerActivity
├── Momang
│   └── MomangActivity
└── MissionManager
    ├── Mission (base class)
    ├── RepeatedMission
    └── ... other mission types
```

## Tech Stack

- TypeScript
- JavaScript
- HTML
- CSS
- Vite