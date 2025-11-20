import java.util.*;

/*
    Problem:
    Given an array of integers, return the second largest unique number in the array.
    If it doesn’t exist, return -1.

    Approach:
    - Use two variables: largest, secondLargest
    - Traverse the array once (O(n))
    - Update largest and secondLargest accordingly
    - Ignore duplicates of the largest
    - If secondLargest is never updated, return -1

    Time Complexity: O(n)
    Space Complexity: O(1)

    Sample Input
    7
    3 5 2 5 6 6 1

    Output
    5
*/

public class SecondLargestUnique {

    public static int secondLargest(int[] arr) {
        Integer largest = null;
        Integer secondLargest = null;

        for (int num : arr) {
            if (largest == null || num > largest) {
                if (largest != null && num != largest) {
                    secondLargest = largest;
                }
                largest = num;
            } else if (num != largest && (secondLargest == null || num > secondLargest)) {
                secondLargest = num;
            }
        }

        return (secondLargest != null) ? secondLargest : -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // Read array size
        int n = sc.nextInt();
        int[] arr = new int[n];

        // Read array elements
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        // Print result
        System.out.println(secondLargest(arr));

        sc.close();
    }
}
