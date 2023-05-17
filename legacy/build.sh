
cd src
for file in *.php
do
    php "$file" > "../${file%.php}.html"
done
cd ..