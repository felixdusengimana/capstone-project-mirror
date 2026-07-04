package com.pesatone.api.model.pojo;

import java.util.List;

public record UsernameAvailability(boolean available, List<String> suggestions) {
}
