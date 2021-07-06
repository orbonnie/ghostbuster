import PropTypes from 'prop-types';
import { Label, Card, List, Header, Divider } from 'semantic-ui-react';
import CommitsLineChart from './CommitsLineChart';

const StudentDetailCard = ({
  studentInfo,
  showAllCommits,
  commitDetails,
  selectedCohort,
  shouldDisplayByWeek
}) => (
  <Card style={{ marginBottom: '0px' }}>
    <Card.Content style={{ paddingBottom: '10px' }}>
      <Card.Header style={{ marginBottom: '10px' }}>
        <Label size="big" color="teal">{`${studentInfo.firstName} ${studentInfo.lastName}`}</Label>
      </Card.Header>
      <Card.Description>
        <List divided relaxed>
          {studentInfo[`${selectedCohort.split('-').pop()}Urls`].split(',').map(url => (
            <List.Item key={url}>
              <List.Content>
                <List.Header as="a" target="_blank" href={url}>
                  {url.replace('https://github.com/', '')}
                </List.Header>
                <List.Description style={{ fontWeight: 'bold', marginTop: '12px' }}>
                  Total commits:
                  {commitDetails[url.replace('https://github.com/', '')] &&
                    commitDetails[url.replace('https://github.com/', '')].length}
                </List.Description>
                {!showAllCommits && commitDetails[url.replace('https://github.com/', '')] && (
                  <CommitsLineChart
                    commits={commitDetails[url.replace('https://github.com/', '')].sort(
                      (a, b) => new Date(a.date) - new Date(b.date)
                    )}
                    shouldDisplayByWeek={shouldDisplayByWeek}
                  />
                )}
                <Divider section />
                {showAllCommits &&
                  commitDetails[url.replace('https://github.com/', '')] &&
                  commitDetails[url.replace('https://github.com/', '')].length && (
                    <List.Description
                      style={{
                        fontWeight: 'bold',
                        color: 'grey'
                      }}
                    >
                      Latest commits:
                    </List.Description>
                  )}
                <List divided relaxed>
                  {showAllCommits &&
                    commitDetails[url.replace('https://github.com/', '')] &&
                    commitDetails[url.replace('https://github.com/', '')]
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .slice(0, 10)
                      .map(commit => (
                        <List.Item key={commit.date}>
                          <List.Content style={{ textAlign: 'left' }}>
                            {`${commit.date.split('T')[0]} - ${commit.name}`}
                          </List.Content>
                        </List.Item>
                      ))}
                </List>

                {showAllCommits &&
                  commitDetails[url.replace('https://github.com/', '')].length > 10 && (
                    <Header size="tiny" as="a" target="_blank" href={url}>
                      {`${commitDetails[url.replace('https://github.com/', '')].length - 10} more`}
                    </Header>
                  )}
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Card.Description>
    </Card.Content>
  </Card>
);

export default StudentDetailCard;

StudentDetailCard.propTypes = {
  studentInfo: PropTypes.instanceOf(Object).isRequired,
  showAllCommits: PropTypes.bool.isRequired,
  selectedCohort: PropTypes.string.isRequired,
  commitDetails: PropTypes.instanceOf(Object).isRequired,
  shouldDisplayByWeek: PropTypes.bool.isRequired
};
