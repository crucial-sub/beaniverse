import UIKit

@objc class SplashViewController: UIViewController {
  
    private let splashImageView: UIImageView = {
        let imageView = UIImageView(frame: .zero)
        
        
        imageView.image = UIImage(named: "SplashScreen")
        imageView.contentMode = .scaleAspectFit
        imageView.translatesAutoresizingMaskIntoConstraints = false
        return imageView
    }()
  
  private let titleLabel: UILabel = {
          let label = UILabel()
          label.text = "Beaniverse"
          label.textColor = .white
          label.font = UIFont.systemFont(ofSize: 28, weight: .bold)
          label.translatesAutoresizingMaskIntoConstraints = false
          return label
      }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
    }
    
    private func setupUI() {
        view.backgroundColor = UIColor(red: 217/255, green: 115/255, blue: 66/255, alpha: 1.0)  // 오렌지 배경색
        view.addSubview(splashImageView)
        view.addSubview(titleLabel)
        
        NSLayoutConstraint.activate([
          splashImageView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
          splashImageView.centerYAnchor.constraint(equalTo: view.centerYAnchor, constant: -50),
          splashImageView.widthAnchor.constraint(equalToConstant: 79),
          splashImageView.heightAnchor.constraint(equalToConstant: 66.08),
            
          titleLabel.topAnchor.constraint(equalTo: splashImageView.bottomAnchor, constant: 20),
          titleLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor)
        ])
    }
}
