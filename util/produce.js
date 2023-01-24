//immer가 익스플로 작동이 안되어서 다음을 설정

import { enableES5, produce } from 'immer';

export default (...args) => {
    enableES5();
    return produce(...args);
};
