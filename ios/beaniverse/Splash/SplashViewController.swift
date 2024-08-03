import UIKit

@objc class SplashViewController: UIViewController {
    
    private let splashImageView: UIImageView = {
        let imageView = UIImageView(frame: .zero)
        imageView.image = UIImage(named: "SplashScreen")
        imageView.contentMode = .scaleAspectFit
        imageView.translatesAutoresizingMaskIntoConstraints = false
        return imageView
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
    }
    
    private func setupUI() {
        view.backgroundColor = UIColor(red: 217/255, green: 115/255, blue: 66/255, alpha: 1.0)  // 오렌지 배경색
        view.addSubview(splashImageView)
        
        NSLayoutConstraint.activate([
            splashImageView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            splashImageView.centerYAnchor.constraint(equalTo: view.centerYAnchor),
            splashImageView.widthAnchor.constraint(equalTo: view.widthAnchor),
            splashImageView.heightAnchor.constraint(equalTo: view.heightAnchor)
        ])
    }
}
