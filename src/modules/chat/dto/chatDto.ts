export interface Persona {
    _id: string;
    slug: string;
    name: string;
    avatarUrl?: string;
}

export interface PersonasResponseDto {
    personas: Persona[];
}

export interface MessagePart {
    text: string;
}

export interface Message {
    _id?: string;
    role: "user" | "model";
    parts: MessagePart[];
    createdAt?: string;
}

export interface ChatHistoryResponseDto {
    messages: Message[];
}

export interface SendMessageRequestDto {
    prompt: string;
    personaSlug: string;
}

export interface SendMessageResponseDto {
    reply: string;
    persona: {
        slug: string;
        name: string;
    };
}
