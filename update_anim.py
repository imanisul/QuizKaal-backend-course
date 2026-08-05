import re

with open('components/oop-course/AnimatedVisuals.jsx', 'r') as f:
    content = f.read()

# Replace min-h-[20rem] md:min-h-[24rem] with min-h-[350px] md:min-h-[450px] lg:min-h-[500px]
content = re.sub(r'min-h-\[20rem\] md:min-h-\[24rem\]', 'min-h-[350px] md:min-h-[450px] lg:min-h-[500px]', content)

with open('components/oop-course/AnimatedVisuals.jsx', 'w') as f:
    f.write(content)
