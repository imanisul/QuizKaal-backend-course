export const CPP_MOUNTAINS_GAMES = [
  {
    id: 'dsa-arrays',
    slug: 'arrays-and-hashing',
    title: 'Arrays & Hashing',
    description: 'Master the foundation of all Data Structures',
    color: 'from-blue-400 to-indigo-600',
    unlockStarsRequired: 0,
    rewards: { xp: 500, coins: 200, stars: 5 },
    intro: {
      title: 'Arrays & Hashing',
      description: 'The journey to the peak begins with Arrays. They are the most fundamental data structure. Mastering Two-Pointer techniques and Hashing is critical for passing the first round of any technical interview.',
      mascotIcon: 'Layers'
    },
    // Step 1: Concept & Animation (simulated via text/visual in renderer)
    theory: {
      title: 'O(1) Lookup with Hash Maps',
      content: 'An array provides O(1) access if you know the index. But if you need to find a specific value, it takes O(N) time to scan. By using an `std::unordered_map`, you can achieve O(1) lookups for values, trading space for time.',
      codeSnippet: `#include <unordered_map>\n#include <iostream>\n\nint main() {\n  std::unordered_map<int, int> m;\n  m[5] = 10; // O(1) insert\n  if (m.find(5) != m.end()) {\n    std::cout << "Found 5!" << std::endl;\n  }\n  return 0;\n}`,
      bestPractices: [
        'Use std::unordered_map for O(1) average time complexity.',
        'Use std::map only when you need the keys to be sorted (O(log N)).',
        'Always pass large arrays/vectors by reference `const vector<int>&` to avoid O(N) copying.'
      ],
      commonMistakes: [
        'Using map instead of unordered_map when sorting is not required.',
        'Modifying the array while iterating over it using a range-based for loop.'
      ],
      interviewQuestions: [ // These are "Real Interview Questions" for the end
        {
          q: 'Why does unordered_map have worst-case O(N) time complexity?',
          a: 'Hash collisions. If multiple keys hash to the same bucket, they are stored in a linked list. If the hash function is poor, all keys could end up in one bucket.'
        }
      ]
    },
    // Step 2: Practice (Mini Challenge)
    codeChallenge: {
      title: 'Two Sum (Classic FAANG Question)',
      mission: 'Use an unordered_map to find two numbers that add up to the target in O(N) time.',
      initialCode: `#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n  vector<int> nums = {2, 7, 11, 15};\n  int target = 9;\n  // Output exactly: "Indices: 0, 1"\n\n  // Write your O(N) logic below:\n  \n  return 0;\n}`,
      validatorRegex: /cout\s*<<\s*["']Indices: 0, 1["']/,
      errorMsg: 'You must output exactly "Indices: 0, 1"',
      simulatedOutput: 'Indices: 0, 1\n\nProcess finished with exit code 0.'
    },
    // Step 3: Quiz
    quiz: {
      question: 'What is the space complexity of using an unordered_map to store array frequencies?',
      options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
      correctAnswer: 'O(N)'
    }
  },
  {
    id: 'dsa-sliding-window',
    slug: 'sliding-window',
    title: 'Sliding Window',
    description: 'Optimize O(N^2) loops into O(N)',
    color: 'from-emerald-400 to-teal-600',
    unlockStarsRequired: 5,
    rewards: { xp: 600, coins: 300, stars: 5 },
    intro: {
      title: 'Sliding Window Technique',
      description: 'Nested loops calculating subarrays usually take O(N^2) time. The Sliding Window technique maintains a moving window, reducing the time complexity to O(N).',
      mascotIcon: 'Puzzle'
    },
    theory: {
      title: 'Dynamic vs Fixed Windows',
      content: 'A fixed window maintains a constant size `k` (e.g., max sum of subarray of size k). A dynamic window expands and shrinks based on a condition (e.g., longest subarray with sum < k).',
      codeSnippet: `int max_sum = 0, current_sum = 0;\nfor (int i = 0; i < k; i++) current_sum += arr[i]; // Initial window\nmax_sum = current_sum;\n\nfor (int i = k; i < n; i++) {\n  current_sum += arr[i] - arr[i - k]; // Slide window\n  max_sum = max(max_sum, current_sum);\n}`,
      bestPractices: [
        'Always establish the initial window state before sliding.',
        'Use `L` and `R` pointers for dynamic windows.',
        'Be careful with out-of-bounds errors when calculating `arr[i - k]`.'
      ],
      commonMistakes: [
        'Resetting the window completely instead of subtracting the left-most element.',
        'Using an O(N) operation inside the sliding loop, ruining the O(N) optimization.'
      ],
      interviewQuestions: [
        {
          q: 'How do you identify a Sliding Window problem?',
          a: 'Keywords like "longest contiguous subarray", "substring", or "maximum sum of size K". If the problem asks for a contiguous sequence in an array/string, it is likely Sliding Window.'
        }
      ]
    },
    codeChallenge: {
      title: 'Maximum Subarray Sum (Size K)',
      mission: 'Output exactly "Max Sum: 9".',
      initialCode: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n  vector<int> arr = {2, 1, 5, 1, 3, 2};\n  int k = 3;\n  // Output exactly: "Max Sum: 9"\n\n  // Write your sliding window logic below:\n  \n  return 0;\n}`,
      validatorRegex: /cout\s*<<\s*["']Max Sum: 9["']/,
      errorMsg: 'You must output exactly "Max Sum: 9"',
      simulatedOutput: 'Max Sum: 9\n\nProcess finished with exit code 0.'
    },
    quiz: {
      question: 'What is the time complexity of an optimal sliding window algorithm over an array of size N?',
      options: ['O(N^2)', 'O(N log N)', 'O(N)', 'O(1)'],
      correctAnswer: 'O(N)'
    }
  }
];
