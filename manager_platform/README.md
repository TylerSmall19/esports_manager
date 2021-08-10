# eSports Manager Simulator 2023

You play as an org owner of an eSports team, and you handle everything from the budget to the training to the scouting to the coaching of your org.

At least in the early days.

## Gameplay

### Sign Players

A team can't function without talent -- Scout from a list of generated players hungry for success, and eager to get started training and playing together from day 1.

- Use your players to earn your org money from sponsorships, streaming revenue, and merch sales.
  - The more popular your players get, the more they'll make you (and the more you'll have to pay them to keep 'em around)

### *Play matches*

### Train your team

### Own multiple teams

### Manage your budget

### Take over the eSports scene

## Skills break-down

### Nerves and Ego
- Nerves go down by 1 every 4 official games played
- Ego goes down by 1 every 2 official games with 4+ deaths
- Nerves will have a `25 * (skill level) + 1` % chance of failing a successful play check
  - Nerves at 100 will have a 26% chance of failure, nerves at 0 will still have 1% chance
- Ego will have a `25 * (skill level) + 1` %  chance of causing a safety check to fail
  - Ego at 100 will have a 26% chance of failure, ego at 0 will still have a 1% chance
- In "high pressure" matches (play offs, finals of tournaments, etc.) these values are 1.15x highers
  - 100 becomes 115, 0 remains 0

### Improving "Trainable" individual Skills
The trainable skills are Proactivity, Mechanics, Safety, Awareness, and Leadership.

You can improve these 5 skills most quickly through solo practice of your players. Second most effective is from team practice, and third most effective is through
playing games on stream. Now let's learn more about the different types of practice:

#### __Solo Practices__

Practicing solo means each member of your team is playing by themselves and practicing their own skills. This method won't build any team skills, but more on that later.

For now, let's look at the improvement of skills for the solo practice. These can be broken down into 3 categories: **maintain** **improve** and **decaying**. Each
practice you get to set your skill targets. You can choose 1 skills to improve, 2 to maintain, and 2 to decay. Balancing these types of practice while still allowing
your player time for matches, team practices, and streaming for revenue is a skillful dance, but what do these types mean?

- "Maintain" skills stay where they are across each cycle
- "Improve" skills go up by 2 every 3 cycles
- "Decaying" skills go down by 1 every 2 cycles

This means that over every 6 cycles the skills will decay by 3, improve by 4, or maintain their standards.

#### __Team Practices__

Practicing as a team means working on team specific skills. These skills start as the average of your team's overall relavant skills, and can improve through practice. 
Team skills don't decay, but your starting skills are recalculated upon every roster swap and you have to start building them up from scratch. This means you should
roster swap only when players are really not working out, unless you like to grind that synergy up again and again. __Teams that invest in their own talent are 
rewarded__ so keep that in mind before making that trade or swap.

Since team skills don't decay, practices are simpler:
- Up to 2 team specific skills are improved at the rate of 2 points every 3 cycles.
- 1 individual skill for the entire team _improves_ at the rate of 1 point every 3 cycles.
- 2 individual skills for the entire team _maintain_
- 2 indivual skills for the entire team _decay_ at the rate of 1 point every 3 cycles.

### All things Skills

#### **Nerves**
#### **Ego**
#### **Proactivity**
#### **Mechanics**

Mechanics affect how your player earns gold and how they outplay your opponents plays.

It pairs nicely with Awareness and safety for defense and with Proactivity and Awareness for offense.

A __mechanics__ check is used when an opponent attempts to make a play on you. The players involved in making the play have their mechanics skill averaged together. This
number is then subtracted from your __mechanics__ number to get the differential. That number is then added to your saving check for survival.

A highly mechanical player with good awareness and safety will be nearly impossible to kill by players without good proactivity and mechanics themselves.

These checks are affected by both Ego and Nerves.
#### **Safety**
#### **Awareness**
#### **Leadership**

Leadership affects the success of _proactive_ plays accross the team, helps fight _morale loss_, and pairs well with Proactivity to secure _objectives._
