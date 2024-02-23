"""
This is the main file for kmom10 in BTH's python course.
This is a keyboard training program with three levels of difficulty
that can be used to train keyboard fluency.
"""
import keyboard_training as kt

def main():
    """
    Main function, runs the keyboard training program in a while loop
    """
    while True:
        kt.clear_screen()
        level = kt.get_level()
        if level == 'q':
            print("Thanks for playing!")
            break
        elif level == 4:
            kt.print_high_scores()
        elif level == 5:
            kt.randomized_writing_test()
            kt.enter_to_continue()
        else:
            sentences = kt.get_sentences_by_level(level)
            sentences = kt.format_level(sentences)
            results, mismatched_keys, words_sum = kt.play(sentences)
            score, time_taken = kt.calculate_score_time(results)
            kt.clear_screen()
            print("Test finished. \nCalculating results...\nResults now in!")
            kt.enter_to_continue()
            kt.clear_screen()
            kt.print_statistics(mismatched_keys, time_taken, sentences, score, words_sum)
            kt.write_high_score(score, level)

if __name__ == "__main__":
    main()
