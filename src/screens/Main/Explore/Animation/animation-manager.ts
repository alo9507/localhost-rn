import { Dimensions } from 'react-native';
import _ from 'lodash';

class AnimationManager {
    constructor (users, widthOfView) {
        this.users = users;

        this.padding = 20;
        this.widthOfView = widthOfView;
        this.marginBetweenOfRow = 130;

        this.deviceWidth = Dimensions.get('window').width;
        this.centerOfScreen = (this.deviceWidth - this.widthOfView) / 2;
        this.marginOfCenter = this.widthOfView * 0.5;
    }

    calculateInitialPositionX = (index) => {
        const mod = index % 3;

        switch (mod) {
            case 0:
                return this.padding;

            case 1:
                return this.centerOfScreen;

            case 2:
                return this.deviceWidth - this.widthOfView - this.padding;

            default:
                throw new Error('Invalid');
        }
    };

    calculateInitialPositionY = (index) => {
        const mod = index % 3;
        const divide = Math.trunc(index / 3);
        const rowPosition = divide * this.marginBetweenOfRow;

        switch (mod) {
            case 0:
                return rowPosition;

            case 1:
                return rowPosition + this.marginOfCenter;

            case 2:
                return rowPosition;

            default:
                throw new Error('Invalid');
        }
    };

    calculateInitialPositions = () => {
        const positions = this.users.map((user, index) => {
            return {
                y: this.calculateInitialPositionY(index),
                x: this.calculateInitialPositionX(index),
            };
        });

        return positions;
    };

    calculateAfterMovingPositionX = (index) => {
        const mod = index % 2;

        switch (mod) {
            case 0:
                return 0 - this.widthOfView / 2;

            case 1:
                return this.deviceWidth - this.widthOfView / 2;

            default:
                throw new Error('Invalid');
        }
    };

    calculateAfterMovingPositionY = (index) => {
        const mod = index % 2;
        const divide = Math.trunc(index / 2);
        const rowPosition = divide * this.marginBetweenOfRow;

        switch (mod) {
            case 0:
                return rowPosition;

            case 1:
                return rowPosition;

            default:
                throw new Error('Invalid');
        }
    };

    calculateAfterMovingPositions = (user) => {
        const withoutClickedUser = this.users.filter((item) => item !== user);

        const userIndex = this.users.indexOf(user);

        const positions = withoutClickedUser.map((item, index) => {
            return {
                y: this.calculateAfterMovingPositionY(index),
                x: this.calculateAfterMovingPositionX(index),
            };
        });

        const shuffled = _.shuffle(positions);

        const withClickedUser = [
            ...shuffled.slice(0, userIndex),
            {
                x: this.centerOfScreen,
                y: this.centerOfScreen - this.widthOfView,
            },
            ...shuffled.slice(userIndex),
        ];

        return withClickedUser;
    };
}

export default AnimationManager;
