import os

# Specify the directory and the letter to add
directory = '.'
letter = 'pokemon_'  # Change this to the letter you want to add

# Loop through all the files in the directory
for filename in os.listdir(directory):
    # Construct the old and new file names
    old_file = os.path.join(directory, filename)
    new_file = os.path.join(directory, letter + filename)
    
    # Rename the file
    os.rename(old_file, new_file)

print("Files have been renamed successfully.")
