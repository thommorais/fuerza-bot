# ==============================================================================
# GENERAL CONFIGURATION
#
# View all options here:
# http://compass-style.org/help/tutorials/configuration-reference/
# ==============================================================================

# Require any additional compass plugins here.
require "sass-globbing"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

# Enable relative paths to assets via compass helper functions.
relative_assets = true
sourcemap = true
output_style = :compressed

# ==============================================================================
# COMPASS DIRECTORY CONFIGURATION
# ==============================================================================

# The root of all operations, must be set for Compass to work.
http_path             = "/"

# Directory containing the SASS source files
sass_dir              = "assets/stylesheets"

# Directory where Compass dumps the generated CSS files
css_dir               = "public"

# Directory where font files use in font-face declarations are stored
fonts_dir             = "assets/fonts"

# Directory where Compass stores the Grid image, and the sites images are stored
images_dir            = "assets/images"

# Directory where the sites' JavaScript file are stored
javascripts_dir       = "assets/javascripts"