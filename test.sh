# Add a meal to be voted on
http -v post localhost:5000/mealVotes poster=Bob dishes:='["Shrimp","Clams","Salad"]'
# Vote on a meal
http -v put localhost:5000/mealVotes/vote/43/Shrimp/Pat
# Get a list of votes for meals
http -v get localhost:5000/mealVotes/results/Alex
