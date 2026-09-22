package com.project.gym_management.common.util;

import java.security.SecureRandom;

public class RandomIdGenerator {

    private static final String CHARACTERS =
            "abcdefghijklmnopqrstuvwxyz0123456789";

    private static final SecureRandom RANDOM = new SecureRandom();

    public static String generateId() {
        StringBuilder id = new StringBuilder("@");

        for (int i = 0; i < 8; i++) {
            id.append(CHARACTERS.charAt(
                    RANDOM.nextInt(CHARACTERS.length())
            ));
        }

        return id.toString();
    }
}