#include <vector>
#include <iostream>
using namespace std;

/* Recursive solution 
================================================
** At every steps we are having options
    Basic Idea: To reduce the current value from steps, and finding the 
    total ways steps for steps-curr, re-iterating, while keep adding. 
 */
int countWays(vector<int> v, int steps){
    if(steps==0){
        return 1; // we reached the target
    }
    // result should be sum of all the possible ways at a particular instance
    int ways = 0;
    for(int j=0;j<v.size();j++){
        if(steps-v[j]>=0)
        ways += countWays(v,steps-v[j]);
    }
    return ways;
}


/* Dynamic Prograaming based solution: 1D DP 
================================================
** for each steps we calculate the solution such that, need not to re calculate sub problem.
 */
int optimizedWays(vector<int> values, int steps){
    int ways[steps+1];
    ways[0]=1;// base case there is always 1 way to reach the 0 steps.
    for(int step=1;step<=steps;step++){
        // for each step find out the solution, if value is less<=step
        int countOfWays=0;
        for(int stepVal : values){
            if(stepVal<=step){
                countOfWays += ways[step-stepVal];
            }
        }
        ways[step] = countOfWays;
    }
    return ways[steps];
    // for steps = 5 in { 1,3,5 }
    //Steps: 0 1 2 3 4 5
    //ways: [1 1 1 2 3 5 ]

}

/****************************** */
/*         COMPLEXITIES
/****************************** */
/*

1. Recursion based
    SPACE=> if we don't consider the call stack memory, then O(1)
    TIME => Exponential times at every step, we expoloring the size of array ways ~O(N^N);

2. DP based
    SPACE=> Since we need to rember the sub solution to build bigger solution, for storing that we are using  O(N) array
    TIME => for each steps we iterating the ways array. O(steps*size_of_array) ~ O(N^2);
*/

int main() {
    vector<int> v={1,3,5};
    int N=5;
    cout<<countWays(v,N)<<endl;
    cout<<optimizedWays(v,N);
}

