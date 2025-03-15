# Controlled Chaos With Cursor Animation
This repo shows how to create animations in React without jumping through a million hoops.

It all starts with the onMouseMove event, which grabs the clientX and clientY coordinates of the mouse—basically, where it exists in space. Then, we take those coordinates and use them to position the div we want to animate. Since the goal is to make the div follow the cursor, we have to update its position every time the mouse moves.

But just following the cursor isn’t enough. We need drama. So, I added an animation using keyframes. The idea is simple: generate random positions around the cursor, making the squares look like they’re escaping. The magic happens with translate, which pushes them outward in a smooth, natural way.

Now, one lonely square? Meh. Twenty? Epic. Well… actually, it's not always 20. There are two different ways the number of squares is calculated—one for when the mouse is idle and one for when it’s moving.

Idle Mode: If you stop moving the mouse for 200ms, the animation chills out and limits itself to just 2 squares. Why? Because nobody wants a full-on rainbow explosion when they’re just vibing. It’s subtle enough not to trigger a stroke. Since squares delete themselves 1 second after spawning, and new ones only appear every 500ms, you’ll never see more than 2 at a time.
Active Mode: When you move the mouse, squares spawn every 50ms. Since each square lasts 1 second, that means at any given moment, the maximum number on screen is 20 (1000ms / 50ms = 20). This keeps things looking cool without eating my ram as a cookie and setting my CPU on fire.
So yeah, it’s basically controlled chaos. And that’s the fun part.
