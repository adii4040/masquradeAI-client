export class ChatRoutes {
    public static get LIST_PERSONAS() {
        return '/chat/personas';
    }

    public static get SEND_MESSAGE() {
        return '/chat/chat';
    }

    public static get_chat_history(personaSlug: string) {
        return `/chat/chat/${personaSlug}/history`;
    }
}
