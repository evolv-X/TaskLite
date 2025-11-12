import styled from "@emotion/styled";

type ProgressBarProps = {
  percent: number;
};


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const Track = styled.div`
  width: 100%;
  height: 10px;
  background: rgb(229, 229, 229);
  border-radius: 9999px;
  overflow: hidden;
`;

const Fill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, rgb(155, 121, 207), rgb(103, 76, 140));
  border-radius: 9999px;
  transition: width 0.4s ease;
`;

const Label = styled.p`
  font-size: 14px;
  color: #333;
  margin: 0;
`;

export default function ProgressBar({ percent }: ProgressBarProps) {
  return (
    <Wrapper>
      <Track>
        <Fill style={{ width: `${percent}%` }} />
      </Track>
      <Label>Завершено: {percent}%</Label>
    </Wrapper>
  );
}
