import type { Meta, StoryObj } from '@storybook/nextjs';
import { fn } from 'storybook/test';

import Task from './Task';

// Actions는 UI 컴포넌트를 독립적으로 만들 때 상호작용을 확인하는 데 도움을 줍니다. 종종 앱의 컨텍스트에서 사용하는 함수나 상태에 접근할 수 없을 때가 있습니다. 이때 fn()을 사용해 해당 함수들을 임시로 대체하세요.
export const ActionsData = {
  onArchiveTask: fn(),
  onPinTask: fn(),
};

// 스토리북에게 우리가 문서화하고 테스트하고 있는 컴포넌트에 대해 알려주기 위해, 아래 사항들을 포함하는 default export를 생성합니다:
const meta: Meta<typeof Task> = {
  component: Task, // 컴포넌트 자체
  title: 'Example/Task', // 스토리북 사이드바에서 컴포넌트를 그룹화하거나 분류하는 방법
  tags: ['autodocs'], // 컴포넌트에 대한 문서를 자동으로 생성하기 위한 태그
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/, // 스토리에 필요하지만 스토리북에서 렌더링되지 않아야 하는 추가 정보
  args: {
    //  컴포넌트가 사용자 정의 이벤트를 모킹하기 위해 기대하는 액션 args를 정의
    ...ActionsData,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Task>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    task: {
      id: '1',
      title: 'Test Task',
      state: 'TASK_INBOX',
    },
  },
};

export const Pinned: Story = {
  args: {
    task: {
      ...Default.args!.task!,
      state: 'TASK_PINNED',
    },
  },
};

export const Archived: Story = {
  args: {
    task: {
      ...Default.args!.task!,
      state: 'TASK_ARCHIVED',
    },
  },
};
