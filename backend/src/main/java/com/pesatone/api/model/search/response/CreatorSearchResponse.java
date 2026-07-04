package com.pesatone.api.model.search.response;

import java.io.Serializable;

public record CreatorSearchResponse(Long id,
                                    String username,
                                    String name,
                                    String profileImageUrl,
                                    Boolean verified) implements Serializable {
}
