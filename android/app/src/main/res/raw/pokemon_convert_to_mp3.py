import os
from pydub import AudioSegment

# Specify the directory containing OGG files
directory = '.'

# Loop through all the files in the directory
for filename in os.listdir(directory):
    if filename.endswith('.wav'):
        # Construct the full file path
        ogg_file = os.path.join(directory, filename)
        mp3_file = os.path.join(directory, os.path.splitext(filename)[0] + '.mp3')
        
        # Load the OGG file
        audio = AudioSegment.from_ogg(ogg_file)
        
        # Export the audio as MP3
        audio.export(mp3_file, format='mp3')

print("All OGG files have been converted to MP3.")
