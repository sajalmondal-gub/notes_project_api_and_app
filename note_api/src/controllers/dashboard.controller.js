class DashboardController {
  getDashboardData = async () => {
    res.sendJSON(200, {
      success: true,
      message: `Welcome back !`,
      data: {
        profile: `this is prfofile`,
      },
    });
  };
}

export default new DashboardController();
