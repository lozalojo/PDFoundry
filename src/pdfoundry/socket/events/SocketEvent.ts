/* Copyright 2020 Andrew Cuccinello
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Settings from '../../Settings';

/**
 * @private
 */
export default abstract class SocketEvent {
    /**
     * The type of this event.
     */
    public static get EVENT_TYPE() {
        return 'PDFOUNDRY';
    }

    /**
     * The type of this event.
     */
    public abstract get type();

    /**
     * The user ids that should handle this event.
     */
    protected userIds: string[] | null;

    protected constructor(userIds: string[] | null) {
        this.userIds = userIds;
    }

    /**
     * Get any data that will be sent with the event.
     */
    protected getPayload(): any {
        return {};
    }

    public emit() {
        // @ts-ignore TODO
        game.socket.emit(Settings.SOCKET_NAME, {
            type: this.type,
            userIds: this.userIds,
            payload: this.getPayload(),
        });
    }
}
