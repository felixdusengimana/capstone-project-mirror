package com.pesatone.api.model.search;

public record CreatorSearchResponse(Long id,
                                    String username,
                                    String name,
                                    String profileImageUrl,
                                    Boolean verified) {
}
