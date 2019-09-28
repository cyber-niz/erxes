import gql from 'graphql-tag';
import { withProps } from 'modules/common/utils';
import Content from 'modules/growthHacks/components/priorityMatrix/Content';
import { getFilterParams } from 'modules/growthHacks/utils';
import React from 'react';
import { compose, graphql } from 'react-apollo';
import { queries } from '../../graphql';

type Props = {
  queryParams: any;
};

type FinalProps = {
  growthHacksPriorityMatrixQuery: any;
} & Props;

class ContentContainer extends React.Component<FinalProps> {
  render() {
    const { growthHacksPriorityMatrixQuery } = this.props;

    const growthHacksPriorityMatrix =
      growthHacksPriorityMatrixQuery.growthHacksPriorityMatrix || [];

    const extendedProps = {
      ...this.props,
      growthHacksPriorityMatrix,
      priorityMatrixRefetch: growthHacksPriorityMatrixQuery.refetch
    };

    return <Content {...extendedProps} />;
  }
}

export default withProps<Props>(
  compose(
    graphql<Props>(gql(queries.growthHacksPriorityMatrix), {
      name: 'growthHacksPriorityMatrixQuery',
      options: ({ queryParams = {} }) => ({
        variables: getFilterParams(queryParams)
      })
    })
  )(ContentContainer)
);
