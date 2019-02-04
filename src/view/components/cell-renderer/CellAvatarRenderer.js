import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import PropTypes from "prop-types";

class CellAvatarRenderer extends React.Component {
  static propTypes = {
    avatarSrc: PropTypes.string,
    initials: PropTypes.string,
    primaryLabel: PropTypes.string,
    secondaryLabel: PropTypes.string
  };

  static defaultProps = {
    avatarSrc: null,
    initials: null,
    primaryLabel: null,
    secondaryLabel: null
  };

  renderAvatar = () => {
    const { avatarSrc, initials } = this.props;

    if (avatarSrc) {
      return <Avatar src={avatarSrc} />;
    } else if (initials) {
      return <Avatar>{initials.toUpperCase()}</Avatar>;
    } else {
      return (
        <Avatar>
          <ImageIcon />
        </Avatar>
      );
    }
  };

  render() {
    const { primaryLabel, secondaryLabel } = this.props;

    return (
      <ListItem dense disableGutters>
        {this.renderAvatar()}
        <ListItemText primary={primaryLabel} secondary={secondaryLabel} />
      </ListItem>
    );
  }
}

export default CellAvatarRenderer;
