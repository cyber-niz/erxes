import MainActionBar from 'modules/boards/containers/MainActionBar';
import withPipeline from 'modules/boards/containers/withPipeline';
import { BoardContainer, BoardContent } from 'modules/boards/styles/common';
import { IPipeline } from 'modules/boards/types';
import { __ } from 'modules/common/utils';
import { HACKSTAGES } from 'modules/growthHacks/constants';
import FunnelGroupContainer from 'modules/growthHacks/containers/FunnelGroupContainer';
import { FixedContainer, ScrollContent } from 'modules/growthHacks/styles';
import Header from 'modules/layout/components/Header';
import React from 'react';
import GrowthHackMainActionBar from '../GrowthHackMainActionBar';

type Props = {
  queryParams: any;
  bgColor?: string;
  pipeline: IPipeline;
};

type States = {
  hackStages: any;
};

class FunnelImpact extends React.Component<Props, States> {
  constructor(props) {
    super(props);

    this.state = {
      hackStages: HACKSTAGES.reduce((hackStages, gh, index) => {
        hackStages[gh] = index === 0;

        return hackStages;
      }, {})
    };
  }

  onChangeOpen = (hackStage: string, isOpen: boolean) => {
    const hackStages = this.state.hackStages;
    hackStages[hackStage] = !isOpen;

    this.setState({ hackStages });
  };

  renderContent = () => {
    const queryParams = this.props.queryParams;

    return (
      <FixedContainer>
        <ScrollContent>
          {HACKSTAGES.map(gh => (
            <FunnelGroupContainer
              onChangeOpen={this.onChangeOpen}
              isOpen={this.state.hackStages[gh]}
              key={gh}
              queryParams={queryParams}
              hackStage={gh}
            />
          ))}
        </ScrollContent>
      </FixedContainer>
    );
  };

  renderActionBar = () => (
    <MainActionBar type="growthHack" component={GrowthHackMainActionBar} />
  );

  render() {
    const breadcrumb = [{ title: __('Growth hack') }];

    return (
      <BoardContainer>
        <Header title={__('Growth hack')} breadcrumb={breadcrumb} />
        <BoardContent transparent={true} bgColor={this.props.pipeline.bgColor}>
          {this.renderActionBar()}
          {this.renderContent()}
        </BoardContent>
      </BoardContainer>
    );
  }
}

export default withPipeline(FunnelImpact);
