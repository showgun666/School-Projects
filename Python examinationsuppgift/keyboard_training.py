"""
This file contains all the functions for the keyboard training project for BTH Python course KMOM10
"""
import time
import os
import random

def clear_screen():
    "Clears the screen"
    os.system('cls' if os.name == 'nt' else 'clear')

def enter_to_continue():
    "Prompts user to press enter to continue"
    input("Press 'enter' to continue...")

def get_name():
    "Gets a valid name"
    name = input("Enter your name: ")
    while "," in name:
        clear_screen()
        print("Your name may not contain a comma!")
        name = input("Enter your name again: ")
    while len(name) > 20:
        clear_screen()
        print("Your name must be 20 characters or less!")
        name = input("Enter your name again: ")
    while name == "":
        print("You must input a name!")
        name = input("Enter your name again: ")
    return name

def get_level():
    """
    Menu choice function that displays choices and asks for input.
    Returns either 'q' or an integer.
    """
    # Prompts user for input
    # returns a string or an integer
    menu = "Select a level of difficulty:\n1 easy\n2 medium\n3 hard\n4 high scores\n5 letter typing\nq quit\n"
    level = input(f'{menu}')
    while level not in ['1', '2', '3', '4', '5', 'q']:
        clear_screen()
        level = input(f'Invalid choice. {menu}')
    if level != 'q':
        level = int(level)
    clear_screen()
    return level

def compare_strings(prompt, user_input):
    """
    Compares the prompt and user input, counting the number of mismatches
    Returns dictionary with keys as mismatches and values as number of misses
    Returns amount of words in user input as an integer
    """
    mismatches = {}
    if prompt != user_input[:len(prompt)]:
        i = 0
        while i < min(len(prompt), len(user_input)):
            if prompt[i] != user_input[i]:
                if prompt[i] not in mismatches:
                    mismatches[prompt[i]] = 1
                else:
                    mismatches[prompt[i]] += 1
            i += 1

        # If the user input is shorter than the prompt, 
        # add all the  excess prompt indexes as mismatches
        if len(prompt) > len(user_input):
            for i in prompt[len(user_input):]:
                if i not in mismatches:
                    mismatches[i] = 1
                else:
                    mismatches[i] += 1
    
    words = user_input.split(" ")
    words_sum = 0
    if words[0] != "":
        words_sum = len(words)

    return mismatches, words_sum

def score_test(prompt, mismatches_dictionary, time_taken):
    """
    Scores the test based on number of mismatches and time taken
    """
    mismatches = 0
    # Count mismatches in dictionary
    for key in mismatches_dictionary:
        mismatches += mismatches_dictionary[key]

    length = len(prompt)
    error_percent = round(100 - ((length - mismatches) / length) * 100, 0)
    score = (length * (100 - error_percent)) / time_taken
    return round(score, 0)

def write_high_score(score, level):
    """
    Writes the user's name, score, and time taken to the high scores file
    """
    name = get_name()
    difficulty = get_difficulty(level)
    with open('score.txt', 'a') as f:
        f.write(f"{name},{score},{difficulty}\n")

def print_high_scores():
    """
    Prints the high scores from the high scores file
    """
    scores_sorted = read_and_sort_high_scores()
    scores_tuples = []
    for score in scores_sorted:
        scores_tuples.append(score.split(','))
    print("\nHigh score:")
    for score in scores_tuples:
        name_len = len(score[0])
        name_buffer = " " * (20 - name_len)
        score_len = len(score[1])
        score_buffer = " " * (20 - score_len)
        
        print(f'{score[0]}{name_buffer}{score[1]}{score_buffer}{score[2]}')
    enter_to_continue()

def read_and_sort_high_scores():
    """
    Reads the high scores from the high scores file and sorts them by name and score
    """
    with open('score.txt', 'r') as f:
        scores = f.readlines()
        scores_sorted = []
        for score in scores:
            scores_sorted.append(score.replace("\n", ""))
    # Sort by score
    scores_sorted.sort(key=lambda x: int(x.split(',')[1]), reverse=True)
    # Sort by difficulty
    scores_sorted.sort(key=lambda x: x.split(',')[2], reverse=True)
    return scores_sorted

def get_difficulty(level):
    "Takes level and returns difficulty"
    if level == 1:
        difficulty = "easy"
    elif level == 2:
        difficulty = "medium"
    else:
        difficulty = "hard"
    return difficulty

def get_sentences_by_level(level):
    """
    Gets the sentences from a given level
    Returns a list
    """
    difficulty = get_difficulty(level)
    with open(f'{difficulty}.txt', 'r') as f:
        lines = f.readlines()
    return lines

def format_level(sentences):
    "Cleans the sentences."
    cleaned_lines = []
    for line in sentences:
        cleaned_lines.append(line.replace('\n', ''))
    return cleaned_lines

def play(level):
    """
    Loop for playing the level
    returns a list of tuples (score, time_taken)
    returns a dictionary, mismatched_keys
    returns total time taken
    returns words_sum
    """
    results = []
    mismatched_keys = {}
    words = 0
    for i in level:
        print(i)
        # Start timer
        start_time = time.time()

        # Get mismatches
        mismatches, words_sum = compare_strings(i, input())
        clear_screen()
        
        # Stop timer and get time taken
        end_time = time.time()
        time_taken = end_time - start_time

        words += words_sum

        # Get score
        score = score_test(i, mismatches, time_taken)

        # Save score and time_taken in results
        results.append((score, round(time_taken, 2)))
        # Add mismatches to mismatched_keys
        for key, value in mismatches.items():
            if key not in mismatched_keys:
                mismatched_keys[key] = value
            else:
                mismatched_keys[key] += value
    
    # Sum of time taken
    time_total = 0
    for i in results:
        time_total += i[1]

    return results, mismatched_keys, words

def calculate_score_time(results):
    """
    sums the score from the results
    returns score and time
    """
    score = 0
    time_sum = 0
    for question in results:
        score += question[0]
        time_sum += question[1]
    
    return int(score), time_sum

def print_statistics(mismatched_keys, time_total, sentences, score, words_sum):
    """
    Prints the statistics of a completed level
    """
    # Sorts the mismatched_keys
    # Sort keys in alphabetical order
    sorted_keys = sorted(mismatched_keys.keys(), key=lambda x: x)
    # Sort keys in descending order of values
    sorted_keys = sorted(sorted_keys, key = lambda x: mismatched_keys[x], reverse=True)
    sorted_list = []
    # Put sorted keys with their values in a list of tuples (key, value)
    for key in sorted_keys:
        sorted_list.append((key, mismatched_keys[key]))
    # Print mismatched keys and their respective value
    print(f'Mismatched keys: {sorted_list}')
    
    # Error percent
    # Get total mismatches
    total_mismatches = 0
    for key_value in sorted_list:
        total_mismatches += key_value[1]
    # Get total indexes in sentences
    total_indexes = 0
    for line in sentences:
        total_indexes += len(line)
    error_percent = round(100 - ((total_indexes - total_mismatches) / total_indexes) * 100, 2)
    print(f'Percentage missed: {error_percent}%')

    # print Score
    print(f'Score: {score}')

    # Gives the time_taken
    print(f'Time taken: {time_total} seconds.')

    # Gives words per minute
    time_in_minutes = time_total / 60
    wpm = round(words_sum / time_in_minutes, 2)
    print(f'Words per minute: {wpm}')

def randomized_writing_test():
    """
    test that allows the user to select a number of seconds for the test.
    Prompts the user to type a randomly generated character as quickly as possible.
    Prints out the characters that were typed incorrectly and the number of times they were typed incorrectly.
    Prints out the percentage of characters typed incorrectly and the number of characters typed per minute.
    """
    # Get the number of seconds for the test
    duration = int(input("Enter the number of seconds for the test: "))
    clear_screen()
    start_time = time.time()
    end_time = start_time + duration
    
    correct_characters = 0
    incorrect_characters = 0
    incorrect_characters_dict = {}
    user_input = ""
    while time.time() < end_time:
        # Generate a random character
        random_char = chr(random.randint(48, 125))
        prompt = f"Type the character '{random_char}': "
        user_input = input(prompt)
        if user_input == random_char:
            correct_characters += 1
        else:
            incorrect_characters += 1
            if random_char in incorrect_characters_dict:
                incorrect_characters_dict[random_char] += 1
            else:
                incorrect_characters_dict[random_char] = 1
        clear_screen()

    # Print the characters typed incorrectly
    print("Characters typed incorrectly:")
    incorrect_characters_sorted = sorted(incorrect_characters_dict.items(), key=lambda x: x[1], reverse=True)
    print(incorrect_characters_sorted)
    # Print the percentage of characters typed incorrectly
    total_characters = correct_characters + incorrect_characters
    error_percent = (incorrect_characters / total_characters) * 100
    print(f"Percentage of characters typed incorrectly: {error_percent:.2f}%")
    # Print the number of characters typed per minute
    total_time = time.time() - start_time
    characters_per_minute = total_characters / (total_time / 60)
    print(f"Characters typed per minute: {characters_per_minute:.2f}")
