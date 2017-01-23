package com.nan.buy.common;

import java.util.Random;

public class RandomUtil {
	
	public static int random(int max) {
        Random random = new Random();
        return random.nextInt(max);
    }
	
	public static int random(int min, int max) {
        Random random = new Random();
        return random.nextInt(max)%(max-min) + min;
    }
	
	public static void main(String[] args) {
		for (int i = 0; i < 10; i++) {
			System.out.println(RandomUtil.random(100000, 1000000));
		}
	}

}
